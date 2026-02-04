from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
import uvicorn
import uuid
from datetime import datetime, timezone
from bson import ObjectId

from database import get_db
from nlp_utils import extract_text, detect_skills, calculate_match

app = FastAPI(title="SkillSense AI API")

# Configure CORS - Added immediately after app init
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # This ensures that even on unhandled crashes, we return JSON and allow CORS middleware to run
    print(f"Unhandled error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
    )

# Models
class AnalyzeSkillsRequest(BaseModel):
    analysis_id: Optional[str] = None
    resume_text: Optional[str] = None

class GapAnalysisRequest(BaseModel):
    analysis_id: str
    target_role: str

# Static Role Requirements for Gap Analysis
ROLE_REQUIREMENTS = {
    "Senior Frontend Developer": ["React", "TypeScript", "Next.js", "TailwindCSS", "JavaScript", "Testing", "Performance Optimization"],
    "Backend Engineer": ["Python", "Node.js", "SQL", "Redis", "Docker", "API Design", "microservices"],
    "Full Stack Developer": ["React", "Node.js", "TypeScript", "SQL", "TailwindCSS", "PostgreSQL", "System Design"],
    "Technical Product Manager": ["Agile", "Roadmapping", "SQL", "Technical Writing", "Stakeholder Management", "UX Principles"],
    "Data Scientist": ["Python", "Machine Learning", "SQL", "Statistic Analysis", "Pandas", "PyTorch", "Data Visualization"],
    "Machine Learning Engineer": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Model Deployment", "Data Engineering"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Monitoring", "Shell Scripting"],
    "Cloud Architect": ["AWS", "Azure", "Cloud Infrastructure", "Security", "Serverless", "Kubernetes", "Architecture"],
    "Cybersecurity Analyst": ["Network Security", "Penetration Testing", "Security Auditing", "SIEM", "Firewalls", "Compliance"],
    "UI/UX Designer": ["Figma", "User Research", "Prototyping", "Design Systems", "Visual Design", "Wireframing", "Interaction Design"]
}

@app.get("/")
async def root():
    return {"message": "Welcome to SkillSense AI API"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith((".pdf", ".txt")):
            raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")
        
        content = await file.read()
        text = extract_text(content, file.filename)
        
        analysis_id = str(uuid.uuid4())
        analysis_record = {
            "analysis_id": analysis_id,
            "filename": file.filename,
            "raw_text": text,
            "status": "uploaded",
            "created_at": datetime.now(timezone.utc)
        }
        
        db = get_db()
        await db.ResumeAnalysis.insert_one(analysis_record)
        
        return {
            "analysis_id": analysis_id,
            "extracted_text": text[:500] + "..." if text and len(text) > 500 else text
        }
    except Exception as e:
        # Catch and log the error to avoid generic 500 and CORS blocking
        print(f"Error in upload_resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.post("/analyze-skills")
async def analyze_skills(request: AnalyzeSkillsRequest):
    db = get_db()
    
    if request.analysis_id:
        record = await db.ResumeAnalysis.find_one({"analysis_id": request.analysis_id})
        if not record:
            raise HTTPException(status_code=404, detail="Analysis ID not found")
        text = record["raw_text"]
    elif request.resume_text:
        text = request.resume_text
    else:
        raise HTTPException(status_code=400, detail="Missing analysis_id or resume_text")
    
    skills = detect_skills(text)
    
    if request.analysis_id:
        await db.ResumeAnalysis.update_one(
            {"analysis_id": request.analysis_id},
            {"$set": {"skills": skills, "status": "analyzed", "updated_at": datetime.now(timezone.utc)}}
        )
    
    return skills

@app.post("/gap-analysis")
async def gap_analysis(request: GapAnalysisRequest):
    db = get_db()
    record = await db.ResumeAnalysis.find_one({"analysis_id": request.analysis_id})
    if not record:
        raise HTTPException(status_code=404, detail="Analysis ID not found")
    
    user_skills = []
    if "skills" in record:
        for cat in record["skills"]:
            user_skills.extend([s["name"] for s in record["skills"][cat]])
    
    target_skills = ROLE_REQUIREMENTS.get(request.target_role, [])
    if not target_skills:
        # Fallback or generic role handling
        target_skills = ["Communication", "Problem Solving", "Technical Excellence"]
    
    result = calculate_match(user_skills, target_skills)
    
    await db.ResumeAnalysis.update_one(
        {"analysis_id": request.analysis_id},
        {"$set": {
            "gap_analysis": {
                "target_role": request.target_role,
                "match_percentage": result["match_percentage"],
                "missing_skills": result["missing_skills"]
            },
            "updated_at": datetime.now(timezone.utc)
        }}
    )
    
    return result

@app.get("/career-suggestions/{analysis_id}")
async def career_suggestions(analysis_id: str):
    db = get_db()
    record = await db.ResumeAnalysis.find_one({"analysis_id": analysis_id})
    if not record:
        raise HTTPException(status_code=404, detail="Analysis ID not found")
    
    # Logic to provide suggestions based on gap analysis or skills
    # Placeholder suggestions
    suggestions = {
        "suggested_roles": [
            {"title": "Senior Software Engineer", "match": "85%"},
            {"title": "Full Stack Developer", "match": "75%"}
        ],
        "next_skills": ["TypeScript", "Docker", "GraphQL"],
        "improvement_tips": [
            "Add quantifiable achievements to your experience section.",
            "Highlight your 'System Design' skills more prominently.",
            "Ensure your contact information is up to date."
        ]
    }
    
    return suggestions

@app.get("/analysis-history/{user_id}")
async def analysis_history(user_id: str):
    # For now, return all since we don't have user auth yet
    db = get_db()
    cursor = db.ResumeAnalysis.find().sort("created_at", -1).limit(10)
    history = []
    async for doc in cursor:
        history.append({
            "analysis_id": doc["analysis_id"],
            "filename": doc.get("filename"),
            "status": doc.get("status"),
            "created_at": doc.get("created_at").isoformat()
        })
    return history

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

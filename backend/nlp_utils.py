import fitz  # PyMuPDF
import re
import spacy
from typing import List, Dict

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_md")
except:
    # If not found, download it or use a fallback
    import os
    os.system("python -m spacy download en_core_web_md")
    nlp = spacy.load("en_core_web_md")

# Simple dictionary-based skill library for fallback/enhancement
SKILL_LIBRARY = {
    "Technical": [
        "Python", "JavaScript", "TypeScript", "React", "Next.js", "FastAPI", "MongoDB", "PostgreSQL",
        "AWS", "Docker", "Kubernetes", "Azure", "GCP", "SQL", "NoSQL", "Git", "Node.js", "Java", "C++",
        "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "HTML", "CSS", "Tailwind", "REST API"
    ],
    "Soft": [
        "Leadership", "Communication", "Problem Solving", "Teamwork", "Agility", "Adaptability",
        "Time Management", "Critical Thinking", "Mentoring", "Presentation"
    ],
    "Tools": [
        "Jira", "Confluence", "VS Code", "Postman", "Figma", "Slack", "Github", "Gitlab", "Bitbucket", "Jenkins"
    ]
}

def extract_text(file_content: bytes, filename: str) -> str:
    """Extracts text from PDF or TXT files."""
    text = ""
    if filename.endswith(".pdf"):
        doc = fitz.open(stream=file_content, filetype="pdf")
        for page in doc:
            text += page.get_text()
        doc.close()
    else:
        text = file_content.decode("utf-8", errors="ignore")
    
    # Simple cleaning
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def detect_skills(text: str) -> Dict[str, List[Dict]]:
    """Detects and categorizes skills from text."""
    doc = nlp(text.lower())
    detected = {
        "Technical": [],
        "Soft": [],
        "Tools": []
    }
    
    # Combine NER and keyword matching for better coverage
    full_text = text.lower()
    
    for category, skills in SKILL_LIBRARY.items():
        for skill in skills:
            # Simple keyword matching for demo/MVP
            if re.search(r'\b' + re.escape(skill.lower()) + r'\b', full_text):
                # Score logic: 80+ for found, simulated for now
                score = 85 if category == "Technical" else 75
                detected[category].append({
                    "name": skill,
                    "score": score
                })
    
    return detected

def calculate_match(user_skills: List[str], target_skills: List[str]) -> Dict:
    """Calculates match percentage and identifies missing skills."""
    if not target_skills:
        return {"match_percentage": 0, "missing_skills": []}
    
    user_skills_set = set(s.lower() for s in user_skills)
    target_skills_set = set(s.lower() for s in target_skills)
    
    matched = user_skills_set.intersection(target_skills_set)
    missing = target_skills_set - user_skills_set
    
    match_percentage = int((len(matched) / len(target_skills_set)) * 100)
    
    return {
        "match_percentage": match_percentage,
        "missing_skills": list(missing)
    }

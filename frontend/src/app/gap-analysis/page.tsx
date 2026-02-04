"use client";

import Header from "@/components/Header";
import { useAnalysis } from "@/context/AnalysisContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function GapAnalysisPage() {
    const { analysisId, skills } = useAnalysis();
    const router = useRouter();
    const [targetRole, setTargetRole] = useState("Senior Frontend Developer");
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!analysisId) {
            router.push("/upload");
        } else {
            handleAnalysis(targetRole);
        }
    }, [analysisId, router]);

    const handleAnalysis = async (role: string) => {
        if (!analysisId) return;
        try {
            setIsLoading(true);
            const res = await api.getGapAnalysis(analysisId, role);
            setData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!analysisId) return null;

    const foundInResume = skills ? Object.values(skills).flat().map((s: any) => s.name) : [];
    const matchPercentage = data?.match_percentage || 0;

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200 font-display selection:bg-primary-cyan selection:text-black">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-24">
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">Skill Gap Analysis</h1>
                    <p className="text-slate-400 text-xl max-w-2xl mb-10 font-medium">Select your target trajectory to uncover the missing links in your professional stack.</p>

                    <div className="w-full max-w-md relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-accent-violet rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
                        <select
                            value={targetRole}
                            onChange={(e) => {
                                setTargetRole(e.target.value);
                                handleAnalysis(e.target.value);
                            }}
                            className="relative w-full glass-card h-16 px-6 rounded-2xl text-lg font-bold text-white appearance-none focus:outline-none focus:ring-1 focus:ring-primary-cyan cursor-pointer transition-all hover:bg-white/5"
                        >
                            <option className="bg-[#0a0f1d] text-white" value="Senior Frontend Developer">Senior Frontend Developer</option>
                            <option className="bg-[#0a0f1d] text-white" value="Backend Engineer">Backend Engineer</option>
                            <option className="bg-[#0a0f1d] text-white" value="Full Stack Developer">Full Stack Developer</option>
                            <option className="bg-[#0a0f1d] text-white" value="Technical Product Manager">Technical Product Manager</option>
                            <option className="bg-[#0a0f1d] text-white" value="Data Scientist">Data Scientist</option>
                            <option className="bg-[#0a0f1d] text-white" value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option className="bg-[#0a0f1d] text-white" value="DevOps Engineer">DevOps Engineer</option>
                            <option className="bg-[#0a0f1d] text-white" value="Cloud Architect">Cloud Architect</option>
                            <option className="bg-[#0a0f1d] text-white" value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                            <option className="bg-[#0a0f1d] text-white" value="UI/UX Designer">UI/UX Designer</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined">{isLoading ? 'sync' : 'expand_more'}</span>
                        </div>
                    </div>
                </div>

                {/* Match Gauge */}
                <div className="relative flex justify-center mb-20">
                    <div className="relative size-72 md:size-80 flex items-center justify-center">
                        <svg className="absolute inset-0 size-full -rotate-90">
                            <circle cx="50%" cy="50%" fill="none" r="46%" stroke="rgba(255,255,255,0.05)" strokeWidth="12"></circle>
                            <circle
                                className="transition-all duration-1000 ease-out"
                                cx="50%" cy="50%" fill="none" r="46%"
                                stroke="url(#gaugeGradient)"
                                strokeDasharray="100 100"
                                strokeDashoffset={100 - matchPercentage}
                                strokeLinecap="round" strokeWidth="12"
                                style={{ strokeDasharray: "289", strokeDashoffset: (289 - (289 * matchPercentage) / 100) }}
                            ></circle>
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="#00f2ff" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center z-10">
                            <span className="block text-7xl md:text-8xl font-black text-white leading-none">{matchPercentage}%</span>
                            <span className="block text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-primary-cyan mt-2">Match Level</span>
                        </div>
                        <div className="absolute top-0 right-0 glass-card p-3 rounded-xl border border-primary-cyan/30">
                            <span className="text-xs font-black text-primary-cyan uppercase tracking-tighter">
                                {matchPercentage > 75 ? 'Optimal' : matchPercentage > 50 ? 'Strong' : 'Gap Found'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Existing Skills */}
                    <div className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-cyan/5 blur-3xl rounded-full"></div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary-cyan">verified</span>
                                Existing Skills
                            </h3>
                            <span className="text-slate-500 text-sm font-mono uppercase tracking-widest">{foundInResume.length} Identified</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {foundInResume.map((skill: string) => (
                                <div key={skill} className="px-4 py-2 glass-card rounded-xl text-sm font-bold flex items-center gap-2 border-white/5 hover:border-primary-cyan/30 transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-cyan"></span> {skill}
                                </div>
                            ))}
                            {foundInResume.length === 0 && <p className="text-slate-500 italic">No skills extracted yet.</p>}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/5 blur-3xl rounded-full"></div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent-violet">warning</span>
                                Missing or Weak
                            </h3>
                            <span className="text-slate-500 text-sm font-mono uppercase tracking-widest">{data?.missing_skills?.length || 0} Gaps Found</span>
                        </div>
                        <div className="space-y-4">
                            {data?.missing_skills?.map((skill: string, idx: number) => (
                                <div key={skill} className="flex items-center justify-between p-4 glass-card rounded-2xl border-white/5 hover:border-accent-violet/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-accent-violet">{idx % 2 === 0 ? 'layers' : 'bolt'}</span>
                                        <span className="font-bold text-slate-200">{skill}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${idx % 3 === 0 ? 'bg-accent-violet/20 text-accent-violet border-accent-violet/30' : 'bg-primary-cyan/20 text-primary-cyan border-primary-cyan/30'}`}>
                                        {idx % 3 === 0 ? 'High Impact' : 'Required'}
                                    </span>
                                </div>
                            ))}
                            {!data?.missing_skills?.length && !isLoading && (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <span className="material-symbols-outlined text-green-400 text-5xl mb-4">celebration</span>
                                    <p className="font-black text-xl text-white">Neural Alignment Complete!</p>
                                    <p className="text-sm text-slate-500 mt-2">Your profile perfectly matches the {targetRole} trajectory.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Suggestions CTA */}
                <div className="mb-20">
                    <div className="flex flex-col items-center mb-12">
                        <h3 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-accent-violet">Suggested Next Steps</h3>
                        <div className="h-1 w-20 bg-gradient-to-r from-primary-cyan to-accent-violet mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                        <div className="hidden md:block absolute top-[4.5rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        <div className="relative flex flex-col items-center p-8">
                            <div className="size-12 rounded-full glass-card border-primary-cyan/50 border flex items-center justify-center mb-6 relative z-10 bg-[#05070a]">
                                <span className="material-symbols-outlined text-primary-cyan">auto_awesome</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Bridge the Gaps</h4>
                            <p className="text-sm text-slate-500 text-center">We've identified {data?.missing_skills?.length} key areas to optimize your profile.</p>
                            <button onClick={() => router.push("/suggestions")} className="mt-6 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">View Roadmap</button>
                        </div>
                        <div className="relative flex flex-col items-center p-8">
                            <div className="size-12 rounded-full glass-card border-accent-violet/50 border flex items-center justify-center mb-6 relative z-10 bg-[#05070a]">
                                <span className="material-symbols-outlined text-accent-violet">school</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Skill Acquisition</h4>
                            <p className="text-sm text-slate-500 text-center">Recommended certifications for {targetRole} competencies.</p>
                            <span className="mt-4 text-[10px] font-mono text-slate-600 uppercase">Analysis Engine Active</span>
                        </div>
                        <div className="relative flex flex-col items-center p-8">
                            <div className="size-12 rounded-full glass-card border-white/20 border flex items-center justify-center mb-6 relative z-10 bg-[#05070a]">
                                <span className="material-symbols-outlined text-slate-400">rocket_launch</span>
                            </div>
                            <h4 className="text-lg font-bold mb-2">Targeted Search</h4>
                            <p className="text-sm text-slate-500 text-center">Your current 90th percentile matches are being calculated.</p>
                            <span className="mt-4 text-[10px] font-mono text-slate-600 uppercase">In Progress</span>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase italic">SkillSense AI Engine v2.4 // Distraction-Free Analysis Mode</p>
            </footer>
        </div>
    );
}

"use client";

import Header from "@/components/Header";
import { useAnalysis } from "@/context/AnalysisContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function SuggestionsPage() {
    const { analysisId } = useAnalysis();
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!analysisId) {
            router.push("/upload");
        } else {
            fetchSuggestions();
        }
    }, [analysisId, router]);

    const fetchSuggestions = async () => {
        if (!analysisId) return;
        try {
            setIsLoading(true);
            const res = await api.getSuggestions(analysisId);
            setData(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyOptimizations = () => {
        setIsApplying(true);
        // Simulate AI processing
        setTimeout(() => {
            setIsApplying(false);
            setShowSuccess(true);
            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#05070a] text-slate-200">
                <Header />
                <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-200px)]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-10 border-4 border-primary-cyan border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Synthesizing Career Matrix...</p>
                    </div>
                </main>
            </div>
        );
    }

    const { suggested_roles, next_skills, improvement_tips } = data || {};

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200 font-display selection:bg-primary-cyan selection:text-black">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan text-[10px] font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-base">psychology</span>
                            AI Talent Matching
                        </div>
                        <h1 className="text-white text-5xl font-black tracking-tight leading-tight">Future-Proof Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-accent-violet">Career Path</span></h1>
                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">We've analyzed your unique profile to find high-growth opportunities tailored just for you.</p>
                    </div>
                    <button onClick={fetchSuggestions} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all font-bold text-sm">
                        <span className="material-symbols-outlined text-lg">autorenew</span>
                        Recalibrate
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Roles Column */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    Recommended Roles
                                    <span className="px-2 py-0.5 rounded bg-primary-cyan/20 text-primary-cyan text-[10px] uppercase font-black tracking-tighter">Live Analysis</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {suggested_roles?.map((role: any, idx: number) => (
                                    <div key={role.title} className="glass-card p-6 rounded-[2rem] relative overflow-hidden group hover:border-primary-cyan/50 transition-all duration-500">
                                        <div className={`absolute -top-12 -right-12 size-32 blur-3xl rounded-full transition-all ${idx % 2 === 0 ? 'bg-primary-cyan/10 group-hover:bg-primary-cyan/20' : 'bg-accent-violet/10 group-hover:bg-accent-violet/20'}`}></div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`size-14 rounded-2xl flex items-center justify-center border transition-all ${idx % 2 === 0 ? 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20' : 'bg-accent-violet/10 text-accent-violet border-accent-violet/20'}`}>
                                                <span className="material-symbols-outlined text-3xl">{idx % 2 === 0 ? 'hub' : 'insights'}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-white">{role.match}</span>
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Match</div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 text-[10px] font-black uppercase border border-white/5 tracking-wider">High Growth</span>
                                            </div>
                                            <h3 className="text-xl font-black text-white mb-2 leading-tight">{role.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">Trajectory mapped based on your Python and system design competencies.</p>
                                        </div>
                                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-black rounded-xl transition-all border border-white/10 text-xs uppercase tracking-widest">Detailed Roadmap</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Learning Path */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white">Next Skills to Master</h2>
                            <div className="glass-card rounded-[2.5rem] p-8 space-y-8">
                                {next_skills?.map((skill: string, idx: number) => (
                                    <div key={skill} className="group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`size-10 rounded-xl flex items-center justify-center ${idx % 2 === 0 ? 'bg-primary-cyan/10 text-primary-cyan' : 'bg-accent-violet/10 text-accent-violet'}`}>
                                                    <span className="material-symbols-outlined">{idx % 2 === 0 ? 'data_object' : 'cloud_done'}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-base">{skill}</h4>
                                                    <p className="text-xs text-slate-500 font-medium">Essential for next-gen roles</p>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                                                <span className="material-symbols-outlined">open_in_new</span>
                                            </button>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-gradient-to-r from-primary-cyan to-cyan-300 shadow-[0_0_10px_rgba(0,245,255,0.4)]' : 'bg-gradient-to-r from-accent-violet to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]'}`}
                                                style={{ width: `${60 - (idx * 15)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="glass-card rounded-[2rem] p-8 border-l-4 border-l-primary-cyan relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-10 rounded-full bg-primary-cyan/10 flex items-center justify-center text-primary-cyan">
                                    <span className="material-symbols-outlined">tips_and_updates</span>
                                </div>
                                <h3 className="font-bold text-lg text-white">Resume Improvements</h3>
                            </div>
                            <ul className="space-y-6">
                                {improvement_tips?.map((tip: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${idx % 2 === 0 ? 'bg-green-500/10 text-green-400' : 'bg-primary-cyan/10 text-primary-cyan'}`}>
                                            <span className="material-symbols-outlined text-sm">{idx % 2 === 0 ? 'check' : 'priority_high'}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed">{tip}</p>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleApplyOptimizations}
                                disabled={isApplying || showSuccess}
                                className={`w-full mt-10 py-4 bg-gradient-to-r from-primary-cyan to-blue-600 text-black font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary-cyan/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${isApplying || showSuccess ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {isApplying ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                                        Processing...
                                    </>
                                ) : showSuccess ? (
                                    <>
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        Optimizations Applied
                                    </>
                                ) : (
                                    "Apply AI Optimizations"
                                )}
                            </button>
                            {showSuccess && (
                                <p className="text-[10px] text-primary-cyan font-bold uppercase tracking-widest text-center mt-4 animate-pulse">
                                    Neural stack updated with suggested improvements.
                                </p>
                            )}
                        </div>

                        {/* Profile Strength */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-8xl">rocket_launch</span>
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-white font-black text-xl mb-2">Neural Profile Rank</h4>
                                <p className="text-slate-500 text-sm mb-6 font-medium">You're in the top 15% of candidates for advanced trajectory roles.</p>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span className="text-slate-500">Overall Strength</span>
                                        <span className="text-primary-cyan">High Integrity</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-cyan w-[85%] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.6)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 text-center">
                <div className="flex justify-center gap-8 mb-6">
                    <a href="#" className="text-slate-600 hover:text-primary-cyan transition-colors font-black uppercase tracking-[0.2em] text-[10px]">Manifesto</a>
                    <a href="#" className="text-slate-600 hover:text-primary-cyan transition-colors font-black uppercase tracking-[0.2em] text-[10px]">Neural Privacy</a>
                    <a href="#" className="text-slate-600 hover:text-primary-cyan transition-colors font-black uppercase tracking-[0.2em] text-[10px]">Protocol</a>
                </div>
                <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase mb-2">SkillSense AI Labs © 2024</p>
                <p className="text-[10px] text-slate-800 font-mono tracking-tighter italic">Secure Skill Vectoring Active</p>
            </footer>
        </div>
    );
}

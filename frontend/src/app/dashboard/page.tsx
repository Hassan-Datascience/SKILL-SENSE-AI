"use client";

import Header from "@/components/Header";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const { skills, analysisId } = useAnalysis();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"Technical" | "Soft" | "Tools">("Technical");

    useEffect(() => {
        if (!analysisId) {
            router.push("/upload");
        }
    }, [analysisId, router]);

    if (!skills) {
        return (
            <div className="min-h-screen bg-[#05070a] text-slate-200">
                <Header />
                <main className="flex-1 flex items-center justify-center min-h-[calc(100-300px)] pt-32">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-12 border-4 border-primary-cyan border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-medium tracking-tight">Recalibrating neural insights...</p>
                    </div>
                </main>
            </div>
        );
    }

    const technicalSkills = skills.Technical || [];
    const softSkills = skills.Soft || [];
    const toolSkills = skills.Tools || [];

    const currentInventory = activeTab === "Technical" ? technicalSkills : activeTab === "Soft" ? softSkills : toolSkills;

    // Calculate display values
    const totalSkillsCount = technicalSkills.length + softSkills.length + toolSkills.length;
    const avgScore = technicalSkills.length > 0
        ? Math.round(technicalSkills.reduce((acc: number, s: any) => acc + s.score, 0) / technicalSkills.length)
        : 0;

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200 font-display">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main className="flex-1 px-4 lg:px-8 pt-28 pb-12 max-w-[1600px] mx-auto w-full">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Intelligence Dashboard</h1>
                        <p className="text-slate-400 mt-1">Real-time analysis of your professional skill architecture.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => router.push("/upload")} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
                            <span className="material-symbols-outlined text-[20px]">refresh</span> Re-scan Resume
                        </button>
                        <button onClick={() => router.push("/gap-analysis")} className="bg-primary-cyan text-black px-6 py-2.5 rounded-xl text-sm font-black shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all">
                            Run Gap Analysis
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-card rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-primary-cyan shadow-[0_0_15px_rgba(0,245,255,0.05)]">
                        <div className="size-14 rounded-2xl bg-primary-cyan/10 flex items-center justify-center border border-primary-cyan/20">
                            <span className="material-symbols-outlined text-primary-cyan text-3xl">terminal</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Skills</p>
                            <h3 className="text-2xl font-black text-white">{totalSkillsCount} <span className="text-slate-500 text-xs font-normal ml-1">Analyzed</span></h3>
                        </div>
                    </div>
                    <div className="glass-card rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-accent-violet shadow-[0_0_15px_rgba(168,85,247,0.05)]">
                        <div className="size-14 rounded-2xl bg-accent-violet/10 flex items-center justify-center border border-accent-violet/20">
                            <span className="material-symbols-outlined text-accent-violet text-3xl">bolt</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Avg Proficiency</p>
                            <h3 className="text-2xl font-black text-white">{avgScore}% <span className="text-slate-500 text-xs font-normal ml-1">Percentile</span></h3>
                        </div>
                    </div>
                    <div className="glass-card rounded-2xl p-6 flex items-center gap-5 border-l-4 border-l-slate-400 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <span className="material-symbols-outlined text-slate-300 text-3xl">description</span>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Data Source</p>
                            <h3 className="text-xl font-bold text-white truncate max-w-[150px]">Resume.pdf</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-7 glass-card rounded-[2rem] p-8">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-white">Top Technical Pillars</h2>
                                <p className="text-sm text-slate-500">Relative weight within your professional profile</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            {technicalSkills.slice(0, 5).map((skill: any, idx: number) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-bold text-slate-300">{skill.name}</span>
                                        <span className={`text-sm font-black ${idx % 2 === 0 ? 'text-primary-cyan' : 'text-accent-violet'}`}>{skill.score}/100</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-gradient-to-r from-primary-cyan/80 to-primary-cyan shadow-[0_0_8px_rgba(0,245,255,0.4)]' : 'bg-gradient-to-r from-accent-violet/80 to-accent-violet shadow-[0_0_8px_rgba(168,85,247,0.4)]'}`}
                                            style={{ width: `${skill.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            {technicalSkills.length === 0 && (
                                <p className="text-center py-20 text-slate-500">No technical data available for mapping.</p>
                            )}
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="lg:col-span-5 glass-card rounded-[2rem] overflow-hidden flex flex-col">
                        <div className="flex border-b border-white/5 bg-white/3">
                            <button
                                onClick={() => setActiveTab("Technical")}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Technical' ? 'text-primary-cyan border-b-2 border-primary-cyan' : 'text-slate-500 hover:text-slate-300'}`}
                            >Technical</button>
                            <button
                                onClick={() => setActiveTab("Soft")}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Soft' ? 'text-primary-cyan border-b-2 border-primary-cyan' : 'text-slate-500 hover:text-slate-300'}`}
                            >Soft Skills</button>
                            <button
                                onClick={() => setActiveTab("Tools")}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Tools' ? 'text-primary-cyan border-b-2 border-primary-cyan' : 'text-slate-500 hover:text-slate-300'}`}
                            >Tools</button>
                        </div>
                        <div className="p-6 flex-1 overflow-auto max-h-[400px] custom-scrollbar">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-black">
                                        <th className="pb-4">Competency</th>
                                        <th className="pb-4 text-right">Rel. Score</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {currentInventory.map((item: any) => (
                                        <tr key={item.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 font-bold text-slate-300">{item.name}</td>
                                            <td className="py-4 text-right">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${item.score > 80 ? 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/20' : 'bg-slate-800 text-slate-400 border-white/5'}`}>
                                                    {item.score}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentInventory.length === 0 && (
                                        <tr>
                                            <td colSpan={2} className="py-10 text-center text-slate-500 text-xs">No entries detected for this segment.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-white/5 border-t border-white/5">
                            <button onClick={() => router.push("/suggestions")} className="w-full py-3 bg-gradient-to-r from-accent-violet to-primary-cyan rounded-xl text-[10px] font-black text-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                                View Career Growth Plan
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto py-8 px-6 flex flex-col items-center border-t border-white/5">
                <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">psychology</span>
                        <p>© 2024 SkillSense AI Laboratory</p>
                    </div>
                    <div className="flex gap-8">
                        <a className="hover:text-primary-cyan transition-colors" href="#">Manifesto</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Neural Privacy</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Protocol</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

"use client";

import Header from "@/components/Header";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAnalysis } from "@/context/AnalysisContext";

export default function UploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Preparing upload...");
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { setAnalysisId, setSkills } = useAnalysis();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await processFile(file);
        }
    };

    const processFile = async (file: File) => {
        try {
            setError(null);
            setIsUploading(true);
            setProgress(10);
            setStatus("Uploading resume...");

            // 1. Upload Resume
            const uploadRes = await api.uploadResume(file);
            setProgress(40);
            setStatus("Extracting text...");
            const id = uploadRes.analysis_id;
            setAnalysisId(id);

            // 2. Analyze Skills
            setProgress(70);
            setStatus("Detecting skills...");
            const skillsRes = await api.analyzeSkills(id);
            setSkills(skillsRes);

            setProgress(100);
            setStatus("Analysis complete!");

            setTimeout(() => {
                router.push("/dashboard");
            }, 500);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-primary-cyan selection:text-black">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary-cyan/5 rounded-full pointer-events-none"></div>

                <div className="w-full max-w-4xl z-10">
                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2">
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${progress > 0 ? 'bg-primary-cyan text-black' : 'border border-slate-700 text-slate-400'}`}>1</div>
                            <span className={`text-sm font-semibold transition-all ${progress > 0 ? 'text-white' : 'text-slate-500'}`}>Upload</span>
                        </div>
                        <div className={`w-12 h-[2px] transition-all ${progress >= 40 ? 'bg-primary-cyan/30' : 'bg-slate-800'}`}></div>
                        <div className="flex items-center gap-2">
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${progress >= 70 ? 'bg-primary-cyan text-black' : 'border border-slate-700 text-slate-400'}`}>2</div>
                            <span className={`text-sm font-medium transition-all ${progress >= 70 ? 'text-white' : 'text-slate-500'}`}>Analyze</span>
                        </div>
                        <div className={`w-12 h-[2px] transition-all ${progress >= 100 ? 'bg-primary-cyan/30' : 'bg-slate-800'}`}></div>
                        <div className="flex items-center gap-2">
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${progress === 100 ? 'bg-primary-cyan text-black' : 'border border-slate-700 text-slate-400'}`}>3</div>
                            <span className={`text-sm font-medium transition-all ${progress === 100 ? 'text-white' : 'text-slate-500'}`}>Insights</span>
                        </div>
                    </div>

                    <div className="glass-card rounded-[2rem] p-10 shadow-2xl">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-white mb-3">Accelerate Your Career</h1>
                            <p className="text-slate-400 max-w-lg mx-auto">Upload your professional story. Our AI-engine maps your skills against global industry standards.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
                                <span className="material-symbols-outlined">error</span>
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.txt"
                            onChange={handleFileChange}
                        />

                        {!isUploading ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="glow-border rounded-2xl bg-slate-900/40 p-12 text-center group transition-all cursor-pointer hover:bg-slate-900/60"
                            >
                                <div className="inline-flex items-center justify-center size-20 rounded-full bg-primary-cyan/10 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-primary-cyan">upload_file</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Drop your resume here</h3>
                                <p className="text-slate-400 mb-8">PDF or TXT (Max 10MB)</p>
                                <button className="px-8 py-3 bg-primary-cyan text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all">
                                    Browse Files
                                </button>
                            </div>
                        ) : (
                            <div className="mt-10 space-y-6">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-primary-cyan font-medium">
                                        <span className="material-symbols-outlined text-[18px] animate-spin">cloud_sync</span>
                                        <span>{status}</span>
                                    </div>
                                    <span className="text-primary-cyan font-bold">{progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="h-full bg-primary-cyan shadow-[0_0_10px_rgba(0,245,255,0.5)] rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex gap-6 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                                    <span className={`flex items-center gap-1 transition-all ${progress >= 40 ? 'text-primary-cyan' : ''}`}>
                                        <span className="material-symbols-outlined text-[14px]">{progress >= 40 ? 'check_circle' : 'circle'}</span> Parsed
                                    </span>
                                    <span className={`flex items-center gap-1 transition-all ${progress >= 70 ? 'text-primary-cyan' : ''}`}>
                                        <span className="material-symbols-outlined text-[14px]">{progress >= 70 ? 'check_circle' : 'circle'}</span> Extracting
                                    </span>
                                    <span className={`flex items-center gap-1 transition-all ${progress >= 100 ? 'text-primary-cyan' : ''}`}>
                                        <span className="material-symbols-outlined text-[14px]">{progress >= 100 ? 'check_circle' : 'circle'}</span> Mapping
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="material-symbols-outlined text-primary-cyan">shield_lock</span>
                            <div>
                                <h4 className="text-sm font-bold text-white">Local AI</h4>
                                <p className="text-xs text-slate-400">Analysis happens locally. Your resume text never leaves your session.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="material-symbols-outlined text-primary-cyan">visibility_off</span>
                            <div>
                                <h4 className="text-sm font-bold text-white">Privacy First</h4>
                                <p className="text-xs text-slate-400">We don't train models on your personal data or work history.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="material-symbols-outlined text-primary-cyan">verified</span>
                            <div>
                                <h4 className="text-sm font-bold text-white">GDPR Compliant</h4>
                                <p className="text-xs text-slate-400">Full control over your data with one-click deletion policies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
                <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2024 SkillSense AI Laboratory. Secure Skill Analysis.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary-cyan transition-colors" href="#">System Status</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Documentation</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

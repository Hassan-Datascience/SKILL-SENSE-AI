"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just redirect to upload page
        router.push("/upload");
    };

    return (
        <div className="min-h-screen bg-[#05070a] text-slate-200 font-display selection:bg-primary-cyan selection:text-black">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-cyan/5 rounded-full pointer-events-none"></div>

                <div className="w-full max-w-[440px] z-10">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan text-[10px] font-black uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-base">lock</span>
                            Secure Access
                        </div>
                        <h1 className="text-white text-4xl font-black tracking-tight leading-tight mb-3">Welcome Back</h1>
                        <p className="text-slate-400 font-medium">Synchronize your professional intelligence.</p>
                    </div>

                    <form onSubmit={handleLogin} className="glass-card rounded-[2.5rem] p-10 shadow-2xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                                    Email Profile
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-white/5 bg-white/5 h-14 px-6 text-white text-base focus:ring-1 focus:ring-primary-cyan outline-none transition-all placeholder:text-slate-600"
                                    placeholder="your-alias@matrix.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label htmlFor="password" className="block text-xs font-black text-slate-500 uppercase tracking-widest">
                                        Access Key
                                    </label>
                                    <a href="#" className="text-[10px] font-black text-primary-cyan uppercase tracking-widest hover:underline">Reset</a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border border-white/5 bg-white/5 h-14 px-6 text-white text-base focus:ring-1 focus:ring-primary-cyan outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-cyan text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all transform hover:scale-[1.02]"
                        >
                            Establish Connection
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                                New to SkillSense?{" "}
                                <a href="/upload" className="text-primary-cyan hover:underline transition-all">
                                    Initialize Account
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="py-8 text-center text-slate-700 text-[10px] font-mono tracking-widest uppercase">
                Neural Data Protocol v2.4 Active
            </footer>
        </div>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isLanding = pathname === "/";

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#05070a]/60 backdrop-blur-xl px-6 lg:px-12 py-4">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="size-9 bg-gradient-to-br from-primary-cyan to-accent-violet rounded-lg flex items-center justify-center text-black">
                        <span className="material-symbols-outlined font-bold">psychology</span>
                    </div>
                    <h2 className="text-white text-xl font-bold tracking-tighter">SkillSense <span className="text-primary-cyan">AI</span></h2>
                </Link>

                {isLanding ? (
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-slate-400 hover:text-primary-cyan transition-colors" href="#insights">Insights</a>
                        <a className="text-sm font-medium text-slate-400 hover:text-primary-cyan transition-colors" href="#technology">Technology</a>
                        <a className="text-sm font-medium text-slate-400 hover:text-primary-cyan transition-colors" href="#privacy">Privacy</a>
                        <a className="text-sm font-medium text-slate-400 hover:text-primary-cyan transition-colors" href="#pricing">Pricing</a>
                    </nav>
                ) : (
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/dashboard" className={`text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-primary-cyan' : 'text-slate-400 hover:text-primary-cyan'}`}>Dashboard</Link>
                        <Link href="/gap-analysis" className={`text-sm font-medium transition-colors ${pathname === '/gap-analysis' ? 'text-primary-cyan' : 'text-slate-400 hover:text-primary-cyan'}`}>Gap Analysis</Link>
                        <Link href="/suggestions" className={`text-sm font-medium transition-colors ${pathname === '/suggestions' ? 'text-primary-cyan' : 'text-slate-400 hover:text-primary-cyan'}`}>Suggestions</Link>
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Sign In</Link>
                    {isLanding ? (
                        <Link href="/upload" className="bg-primary-cyan text-black px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all">
                            Get Started
                        </Link>
                    ) : (
                        <div className="flex gap-2">
                            <button className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 border border-white/5 hover:border-white/10 transition-all">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                            <button className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 border border-white/5 hover:border-white/10 transition-all">
                                <span className="material-symbols-outlined">account_circle</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

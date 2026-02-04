"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#05070a] selection:bg-primary-cyan selection:text-black">
            <div className="fixed inset-0 pointer-events-none stardust opacity-10"></div>
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-cyan/20 bg-primary-cyan/5 text-primary-cyan text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                                Edge AI Powered
                            </div>
                            <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8">
                                AI-powered resume skill analysis <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan to-accent-violet">without paid APIs</span>
                            </h1>
                            <p className="text-slate-400 text-lg lg:text-xl font-normal leading-relaxed max-w-[600px] mb-10">
                                Unlock professional insights using local intelligence. Fast, completely private, and no subscription required.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link href="/upload" className="group flex items-center justify-center gap-3 bg-primary-cyan text-black px-8 py-4 rounded-xl text-base font-bold shadow-[0_0_25px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all">
                                    <span className="material-symbols-outlined">analytics</span>
                                    Analyze my resume
                                </Link>
                                <Link href="/dashboard" className="flex items-center justify-center gap-3 bg-transparent border border-white/10 px-8 py-4 rounded-xl text-base font-bold text-white hover:bg-white/5 transition-colors">
                                    View demo dashboard
                                </Link>
                            </div>
                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    <div className="size-10 rounded-full border-2 border-[#05070a] bg-slate-800 flex items-center justify-center text-[10px] font-bold">JD</div>
                                    <div className="size-10 rounded-full border-2 border-[#05070a] bg-slate-700 flex items-center justify-center text-[10px] font-bold">MK</div>
                                    <div className="size-10 rounded-full border-2 border-[#05070a] bg-slate-600 flex items-center justify-center text-[10px] font-bold">SL</div>
                                </div>
                                <p className="text-slate-500 text-sm font-medium tracking-tight">Trusted by 2.4k+ early adopters</p>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 orbit-halo scale-150 animate-pulse"></div>
                            <div className="relative z-10 w-full max-w-[500px]">
                                <div className="glass-card rounded-3xl p-1 overflow-hidden">
                                    <div className="bg-slate-900/40 p-8 rounded-[1.4rem]">
                                        <div className="flex justify-between items-start mb-10">
                                            <div>
                                                <div className="text-xs font-bold text-primary-cyan uppercase tracking-widest mb-1">Live Processing</div>
                                                <div className="text-white text-xl font-bold">Skill Breakdown</div>
                                            </div>
                                            <div className="size-12 rounded-full border-2 border-primary-cyan/30 flex items-center justify-center text-primary-cyan">
                                                <span className="material-symbols-outlined">hub</span>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                                    <span>Technical Architecture</span>
                                                    <span className="text-primary-cyan">94%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary-cyan w-[94%] shadow-[0_0_10px_rgba(0,245,255,0.5)]"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                                    <span>Leadership & Strategy</span>
                                                    <span className="text-accent-violet">82%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-accent-violet w-[82%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                                    <span>Product Management</span>
                                                    <span className="text-slate-300">67%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white/20 w-[67%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10 flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                            <span className="material-symbols-outlined text-green-400">verified</span>
                                            <span className="text-sm font-medium text-slate-300">Ready for Senior Staff Roles</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 lg:px-12 bg-[#05070a] relative">
                    <div className="max-w-[1440px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-white text-3xl lg:text-4xl font-black mb-4">Deep Insight Engine</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">Experience high-fidelity resume parsing that detects nuances local models usually miss.</p>
                        </div>
                        <div className="glass-card rounded-[2.5rem] p-4 lg:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-cyan/5 blur-[100px] pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-violet/5 blur-[100px] pointer-events-none"></div>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="lg:col-span-1 space-y-4 border-r border-white/5 pr-6 hidden lg:block">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white font-bold flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary-cyan">dashboard</span>
                                        Overview
                                    </div>
                                    <div className="p-3 text-slate-500 font-medium flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined">history</span>
                                        Scan History
                                    </div>
                                    <div className="p-3 text-slate-500 font-medium flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined">settings</span>
                                        Model Settings
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative size-32">
                                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                                    <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                                    <circle className="stroke-primary-cyan" cx="18" cy="18" fill="none" r="16" strokeDasharray="92, 100" strokeLinecap="round" strokeWidth="3"></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-black text-white">92%</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Fit Score</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative size-32">
                                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                                    <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                                    <circle className="stroke-accent-violet" cx="18" cy="18" fill="none" r="16" strokeDasharray="78, 100" strokeLinecap="round" strokeWidth="3"></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-black text-white">78%</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Density</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative size-32">
                                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                                    <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                                    <circle className="stroke-slate-400" cx="18" cy="18" fill="none" r="16" strokeDasharray="64, 100" strokeLinecap="round" strokeWidth="3"></circle>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-black text-white">64%</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Keywords Opt.</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-white font-bold mb-4">Optimization Roadmap</h4>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-primary-cyan/20 rounded-lg flex items-center justify-center text-primary-cyan">
                                                    <span className="material-symbols-outlined">add_task</span>
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-bold">Add Kubernetes certifications</div>
                                                    <div className="text-slate-500 text-xs">Increases Job Fit by +12%</div>
                                                </div>
                                            </div>
                                            <span className="text-primary-cyan material-symbols-outlined">arrow_forward_ios</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-accent-violet/20 rounded-lg flex items-center justify-center text-accent-violet">
                                                    <span className="material-symbols-outlined">description</span>
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-bold">Rephrase Impact Statements</div>
                                                    <div className="text-slate-500 text-xs">Action verbs missing in "Experience" section</div>
                                                </div>
                                            </div>
                                            <span className="text-accent-violet material-symbols-outlined">arrow_forward_ios</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 lg:px-12">
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-primary-cyan/50 transition-all duration-500">
                            <div className="size-12 rounded-2xl bg-primary-cyan/10 text-primary-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">privacy_tip</span>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">100% On-Device</h3>
                            <p className="text-slate-400 leading-relaxed">Your resume never touches our servers. The AI processing happens entirely within your browser's secure sandbox.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-accent-violet/50 transition-all duration-500">
                            <div className="size-12 rounded-2xl bg-accent-violet/10 text-accent-violet flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">token</span>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">No API Costs</h3>
                            <p className="text-slate-400 leading-relaxed">Unlike other platforms that charge per scan or require your OpenAI key, SkillSense is free and powered by local open-weight models.</p>
                        </div>
                        <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-primary-cyan/50 transition-all duration-500">
                            <div className="size-12 rounded-2xl bg-primary-cyan/10 text-primary-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">speed</span>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-3">Instant Latency</h3>
                            <p className="text-slate-400 leading-relaxed">Zero network lag. Experience real-time resume refinement and feedback loops that are significantly faster than cloud-based alternatives.</p>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 lg:px-12">
                    <div className="max-w-[1440px] mx-auto relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0a0f1d] to-[#121212] border border-white/10 p-12 lg:p-24 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary-cyan/5 blur-[120px] pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <h2 className="text-white text-4xl lg:text-6xl font-black tracking-tight max-w-4xl">
                                Ready to transform your career <span className="text-primary-cyan">intelligence?</span>
                            </h2>
                            <p className="text-slate-400 text-lg lg:text-xl max-w-2xl">
                                Join the privacy revolution in career management. No trackers, no data leaks, just pure AI power at your fingertips.
                            </p>
                            <div className="mt-4">
                                <Link href="/upload" className="bg-primary-cyan text-black px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:scale-105 transition-all">
                                    Launch Dashboard Now
                                </Link>
                                <p className="mt-6 text-slate-500 text-sm font-medium">Free forever. Local AI processing.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 bg-[#05070a] px-6 lg:px-12 py-16">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-7 bg-white/10 rounded flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">psychology</span>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-tighter">SkillSense AI</h2>
                    </div>
                    <div className="flex gap-12 text-sm font-medium text-slate-500">
                        <a className="hover:text-primary-cyan transition-colors" href="#">Manifesto</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Github</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Security</a>
                        <a className="hover:text-primary-cyan transition-colors" href="#">Discord</a>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">© 2024 SkillSense. Built for the future of work.</p>
                </div>
            </footer>
        </div>
    );
}

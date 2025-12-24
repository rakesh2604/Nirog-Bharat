"use client";

import { CheckCircle } from "lucide-react";

const steps = [
    {
        title: "Sovereign Identity",
        desc: "Scan Aadhaar to generate your unique ABHA ID. Your private keys are generated on-device, ensuring only you control decryption.",
        step: "01",
    },
    {
        title: "Encrypted Storage",
        desc: "Medical records are encrypted via AES-256 and pinned to IPFS. Only the content-addressable Hash is stored on-chain.",
        step: "02",
    },
    {
        title: "ZK-Consent Architecture",
        desc: "Doctors request access; you approve via Biometrics. Zero-Knowledge proofs verify authorization without exposing master keys.",
        step: "03",
    },
    {
        title: "Monetization Engine",
        desc: "Accept research requests. Smart contracts trigger instant ₹ NIROG token transfers to your health wallet upon data release.",
        step: "04",
    },
];

export function NirogBharatWorkflow() {
    return (
        <section id="how-it-works" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                            The Nirog Bharat <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Protocol
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-md">
                            A secure, decentralized pipeline for your health data. From creation to monetization.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {steps.map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-bold font-mono text-lg group-hover:border-cyan-500 group-hover:text-cyan-400 transition-all shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
                                    {item.step}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-white text-xl group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Representation (Mock Device) */}
                <div className="relative">
                    <div className="relative z-10 p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] shadow-2xl border border-slate-800">
                        <div className="bg-slate-950 rounded-[2.8rem] p-8 space-y-8 overflow-hidden h-[600px] relative">

                            {/* Floating UI Elements mocking the app flow */}
                            <div className="absolute top-12 left-8 right-8 animate-float-slow">
                                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                <CheckCircle size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-white">Consent Verified</span>
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono">0x4f...9a12</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full mb-2" />
                                    <div className="h-1.5 w-2/3 bg-slate-800 rounded-full" />
                                </div>
                            </div>

                            <div className="absolute top-48 left-12 right-4 animate-float-delayed">
                                <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/20 shadow-lg">
                                    <p className="text-xs text-cyan-400 font-bold mb-1">INCOMING REQUEST</p>
                                    <p className="text-lg font-bold text-white mb-2">Apollo Hospital</p>
                                    <p className="text-xs text-slate-400">Requesting access to Vitals & Allergies</p>
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-8 right-8 animate-float-reverse">
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Earnings</p>
                                        <p className="text-2xl font-bold text-white mt-1">₹ 2,450</p>
                                    </div>
                                    <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Records</p>
                                        <p className="text-2xl font-bold text-white mt-1">28</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
                        </div>
                    </div>

                    {/* Glow behind device */}
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] -z-10 rounded-full transform scale-90" />
                </div>
            </div>
        </section>
    );
}

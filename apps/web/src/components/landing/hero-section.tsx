"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full opacity-50 animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[100px] rounded-full opacity-30" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-sm font-medium text-cyan-400 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Live across 1.4 Billion Citizens
                </div>

                {/* Headline */}
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase animate-fade-in-up delay-100">
                    From Data Subjects <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-2xl">
                        To Data Owners
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                    Sovereign Health for Naya Bharat.{" "}
                    <span className="text-white font-semibold">Your Data. Your Control. Your Wealth.</span>
                    <br className="hidden md:block" />
                    The UPI for health data has arrived.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in-up delay-300">
                    <Link href="/auth/signin">
                        <Button
                            size="lg"
                            className="h-16 px-10 text-lg font-bold bg-white text-slate-950 hover:bg-cyan-50 transition-all rounded-full shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.7)] hover:scale-105"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="#how-it-works">
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-16 px-10 text-lg font-bold border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 rounded-full transition-all"
                        >
                            How it works
                        </Button>
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-12 flex items-center justify-center gap-8 opacity-60 animate-fade-in-up delay-500">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-mono text-slate-400">AES-256 ENCRYPTED</span>
                    </div>
                    <div className="w-px h-4 bg-slate-800" />
                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-mono text-slate-400">ZK-PROOF VERIFIED</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

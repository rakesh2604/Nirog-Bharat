"use client";

import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { BentoGrid } from "@/components/landing/bento-grid";
import { StatsTicker } from "@/components/landing/stats-ticker";
import { NirogBharatWorkflow } from "@/components/landing/workflow-section";

export default function LandingPage() {
  return (
    <div id="top" className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <a href="#top" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-all">
            <HeartPulse className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase font-mono">Nirog Bharat</span>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a>
          <a href="#roles" className="hover:text-cyan-400 transition-colors">Portals</a>
          <a href="#impact" className="hover:text-cyan-400 transition-colors">Bharat Impact</a>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-800">Login</Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-900/20">Sign Up</Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <HeroSection />
        <StatsTicker />
        <BentoGrid />
        <NirogBharatWorkflow />
      </main>

      <footer className="border-t border-slate-900 py-12 flex flex-col items-center justify-center gap-4">
        <a href="#top" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-bold tracking-tighter">NIROG BHARAT</span>
        </a>
        <p className="text-slate-600 text-sm">© 2025 Nirog Bharat Protocol. Empowering Bharat&apos;s Digital Health Mission.</p>
      </footer>
    </div>
  );
}

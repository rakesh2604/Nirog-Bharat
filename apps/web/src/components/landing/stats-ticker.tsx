"use client";

import { cn } from "@/lib/utils";

const stats = [
    { value: "95%", label: "Data Redundancy Reduced", color: "text-white" },
    { value: "0.5s", label: "Emergency Data Access", color: "text-cyan-400" },
    { value: "₹12Cr+", label: "Patient Token Rewards", color: "text-white" },
    { value: "1.4B", label: "Citizens Covered", color: "text-indigo-400" },
];

export function StatsTicker() {
    return (
        <section id="impact" className="py-24 px-6 border-y border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x divide-slate-800/50">
                    {stats.map((stat, i) => (
                        <div key={i} className="group cursor-default">
                            <p className={cn("text-5xl md:text-6xl font-black mb-2 tracking-tighter transition-transform group-hover:scale-110 duration-300", stat.color)}>
                                {stat.value}
                            </p>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

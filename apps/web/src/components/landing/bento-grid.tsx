"use client";

import { Users, Stethoscope, Building2, ZoomIn, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roles = [
    {
        title: "Patients",
        description: "Manage your health records, approve access, and earn rewards for your data.",
        icon: <Users className="w-6 h-6" />,
        href: "/auth/signin?role=patient",
        color: "bg-cyan-500",
        gradient: "from-cyan-500/20 to-cyan-500/0",
        className: "col-span-1 md:col-span-2 row-span-2",
    },
    {
        title: "Doctors",
        description: "Instant access to patient history with biometric consent.",
        icon: <Stethoscope className="w-6 h-6" />,
        href: "/auth/signin?role=doctor",
        color: "bg-blue-500",
        gradient: "from-blue-500/20 to-blue-500/0",
        className: "col-span-1 row-span-1",
    },
    {
        title: "Researchers",
        description: "Query population health metrics via ZK-proofs.",
        icon: <ZoomIn className="w-6 h-6" />,
        href: "/auth/signin?role=researcher",
        color: "bg-purple-500",
        gradient: "from-purple-500/20 to-purple-500/0",
        className: "col-span-1 row-span-1",
    },
    {
        title: "Pharma",
        description: "Purchase anonymized datasets for clinical trials.",
        icon: <Building2 className="w-6 h-6" />,
        href: "/auth/signin?role=pharma",
        color: "bg-indigo-500",
        gradient: "from-indigo-500/20 to-indigo-500/0",
        className: "col-span-1 md:col-span-2 row-span-1",
    },
];

export function BentoGrid() {
    return (
        <section id="roles" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-bold tracking-tight uppercase">
                    Ecosystem <span className="text-cyan-400">Portals</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Tailored interfaces for every stakeholder in the National Digital Health Mission.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {roles.map((role, i) => (
                    <Link
                        key={i}
                        href={role.href}
                        className={cn(
                            "group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all duration-500",
                            role.className
                        )}
                    >
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", role.gradient)} />

                        <div className="relative h-full p-8 flex flex-col justify-between z-10">
                            <div>
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg", role.color)}>
                                    {role.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {role.description}
                                </p>
                            </div>

                            <div className="flex items-center text-sm font-bold text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                ENTER PORTAL <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </div>

                        {/* Hover decorative blob */}
                        <div className={cn("absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20", role.color)} />
                    </Link>
                ))}
            </div>
        </section>
    );
}

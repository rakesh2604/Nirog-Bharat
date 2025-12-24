"use client";

import { useState } from "react";
import { Users, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";

interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition?: string;
}

export function PatientZoomInView() {
    const [query, setQuery] = useState("");
    // Use TRPC Query with search input
    const { data: patients = [], isLoading } = trpc.doctor.searchPatients.useQuery({ query });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="text-blue-400" /> Patient Registry ZoomIn</h2>

            <div className="relative">
                <ZoomIn className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                <input
                    type="text"
                    placeholder="ZoomIn by Name, ABHA ID or Condition..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-bold"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="text-center py-20 animate-pulse text-blue-500 font-mono">SEARCHING REGISTRY...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {(patients || []).map((p: Patient, i: number) => (
                        <div key={i} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {p.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-lg">{p.name}</p>
                                    <p className="text-xs text-slate-500 font-mono">{p.id} • {p.age}{p.gender} • {p.condition}</p>
                                </div>
                            </div>
                            <Button className="bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-xl">VIEW PROFILE</Button>
                        </div>
                    ))}
                    {(patients || []).length === 0 && query && <p className="text-center text-slate-500 py-10">No patients found matching &apos;{query}&apos;</p>}
                </div>
            )}
        </div>
    );
}

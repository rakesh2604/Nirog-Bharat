"use client";

import { useState } from "react";
import { ShieldAlert, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmergencyQueueView() {
    const [accessing, setAccessing] = useState<string | null>(null);
    const router = useRouter();
    const handleBreakGlass = (id: string) => {
        if (!confirm("WARNING: This action will be logged on the immutable ledger. Proceed with Emergency Break-Glass?")) return;
        setAccessing(id);
        router.push(`/emergency/${id}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><ShieldAlert className="text-red-500" /> Emergency Access Queue</h2>
            <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-3xl mb-8 flex items-center gap-4">
                <ShieldAlert className="text-red-500 w-10 h-10 animate-pulse" />
                <div>
                    <h3 className="font-bold text-red-500">Break-Glass Protocol Active</h3>
                    <p className="text-xs text-red-400/80 max-w-lg">
                        You are authorized to bypass privacy controls for life-threatening situations.
                        Every access request is cryptographically signed and permanently audited.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[{
                    name: "Unknown Male (Trauma)", id: "NB-EMERGENCY-992", time: "2 mins ago", vitals: "BP: 60/40 | HR: 140", status: "CRITICAL"
                }, {
                    name: "Anita Desai", id: "NB-PATIENT-221", time: "12 mins ago", vitals: "Unresponsive", status: "HIGH"
                }].map((item, i) => (
                    <Card key={i} className="bg-slate-900 border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:shadow-[0_0_50px_rgba(220,38,38,0.2)] transition-all overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-3">
                            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded animate-pulse">{item.status}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                <p className="text-xs text-red-400 font-mono mt-1">{item.id}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vitals</p>
                                <p className="text-white font-mono">{item.vitals}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <History className="w-3 h-3" /> Arrived {item.time}
                            </div>
                        </div>
                        <Button
                            onClick={() => handleBreakGlass(item.id)}
                            disabled={accessing === item.id}
                            className={`w-full ${accessing === item.id ? 'bg-red-900' : 'bg-red-600 hover:bg-red-500'} font-bold h-12 rounded-xl transition-all rounded-t-none`}
                        >
                            {accessing === item.id ? "DECRYPTING KEY..." : "BREAK-GLASS ACCESS"}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

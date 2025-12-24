"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { ShieldCheck, WifiOff } from "lucide-react";

export function NirogBharatCard({ abhaId }: { abhaId: string }) {
    const cardData = JSON.stringify({
        id: abhaId,
        blood: "O+",
        allergies: "Peanuts, Penicillin",
        contact: "+91 98765 43210"
    });

    return (
        <Card className="max-w-md w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 overflow-hidden relative group rounded-[2.5rem]">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700 -rotate-12 group-hover:rotate-0">
                <ShieldCheck size={180} className="text-cyan-400" />
            </div>

            <div className="p-10 space-y-10 relative">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-white tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Nirog Card</h2>
                        <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.3em] opacity-80">Sovereign Health Identity</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-full text-[9px] font-black border border-cyan-500/30 tracking-widest uppercase">
                        <WifiOff className="w-3.5 h-3.5" />
                        OFFLINE READY
                    </div>
                </div>

                <div className="flex gap-10 items-center">
                    <div className="p-4 bg-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">
                        <QRCodeSVG
                            value={cardData}
                            size={130}
                            level="H"
                            includeMargin={false}
                            fgColor="#020617"
                        />
                    </div>
                    <div className="space-y-5">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 opacity-60">Citizen Name</p>
                            <p className="text-xl font-black text-white leading-none">Akash Kumar Singh</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 opacity-60">ABHA Digital ID</p>
                            <p className="text-sm font-black font-mono text-cyan-400 tracking-tighter">{abhaId}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800/80">
                    <div className="space-y-1">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest opacity-60">Blood Group</p>
                        <p className="text-2xl font-black text-red-500 flex items-center gap-2">
                            O+
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        </p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest opacity-60">Emergency Access</p>
                        <p className="text-xs font-black text-slate-300 leading-tight uppercase">Triage Protocol <br /> Enabled</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-600 h-2 w-full" />
        </Card>
    );
}

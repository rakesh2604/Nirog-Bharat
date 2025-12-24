"use client";

import { useState } from "react";
import { Activity, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResearcherStatsView() {
    const [connected, setConnected] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3"><Activity className="text-purple-400" /> Population Health Heatmap</h2>
                {connected && <span className="text-green-400 text-xs font-bold font-mono animate-pulse">● LIVE DATA STREAM</span>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="font-bold text-lg">Density by Region</h3>
                    {[
                        { region: "Maharashtra", val: "24.5%", color: "bg-purple-500" },
                        { region: "Karnataka", val: "18.2%", color: "bg-blue-500" },
                        { region: "Delhi NCR", val: "15.8%", color: "bg-cyan-500" },
                        { region: "West Bengal", val: "12.4%", color: "bg-indigo-500" }
                    ].map((r, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-sm"><span>{r.region}</span><span className="font-bold opacity-80">{r.val}</span></div>
                            <div className="h-2 bg-slate-950 rounded-full overflow-hidden"><div className={`h-full ${r.color}`} style={{ width: r.val }} /></div>
                        </div>
                    ))}
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center items-center gap-4 text-center">
                    <MapPin className={`w-16 h-16 transition-all ${connected ? 'text-green-500' : 'text-purple-400 opacity-20'}`} />
                    <h4 className="font-bold text-white">Geospatial Distribution</h4>
                    <p className="text-slate-500 text-sm max-w-xs">{connected ? "Connected to 142 nodes. Aggregating real-time data..." : "Connecting to decentralized nodes in 28 states for real-time epidemiological mapping."}</p>
                    <Button
                        onClick={() => setConnected(!connected)}
                        variant="outline"
                        className={`border-purple-500/20 ${connected ? 'text-green-400 border-green-500/20 bg-green-500/10' : 'text-purple-400'} transition-all`}
                    >
                        {connected ? "DISCONNECT NODE" : "CONNECT TO SPATIAL NODE"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

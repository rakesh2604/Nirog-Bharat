"use client";

import { useState, useEffect } from "react";
import { ZoomIn, Database, Network, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "./metric-card";

export function ResearcherDashboard() {
    const [queryCount, setQueryCount] = useState(482);

    // Simulate query count updates
    useEffect(() => {
        const interval = setInterval(() => {
            setQueryCount(prev => prev + Math.floor(Math.random() * 3));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const recentProofs = [
        { id: "zk-proof-a1b2c3", query: "Diabetes prevalence > 60 years", time: "2 hours ago", status: "Verified", count: 7096 },
        { id: "zk-proof-d4e5f6", query: "Cardiac risk by region", time: "5 hours ago", status: "Verified", count: 4523 },
        { id: "zk-proof-g7h8i9", query: "Vaccination coverage analysis", time: "1 day ago", status: "Verified", count: 12840 },
    ];

    const exportStats = [
        { type: "CSV Exports", count: 48, size: "2.4 GB" },
        { type: "JSON Exports", count: 32, size: "1.8 GB" },
    ];

    const networkNodes = [
        { region: "North India", nodes: 42, latency: "8ms", status: "Healthy" },
        { region: "South India", nodes: 38, latency: "12ms", status: "Healthy" },
        { region: "East India", nodes: 35, latency: "15ms", status: "Healthy" },
        { region: "West India", nodes: 27, latency: "10ms", status: "Healthy" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Enhanced Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="ZKP Queries" value={queryCount.toString()} subtitle="+12 today" />
                <MetricCard title="Nodes Online" value="142" color="text-green-500" subtitle="98.6% uptime" />
                <MetricCard title="Network Latency" value="12ms" color="text-blue-400" subtitle="Avg response time" />
                <MetricCard title="Citizen Reach" value="2.4M" subtitle="De-identified records" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Query History */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Recent Proofs ({recentProofs.length})
                    </h3>
                    <div className="space-y-3">
                        {recentProofs.map((proof, index) => (
                            <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white text-sm truncate">{proof.query}</p>
                                        <p className="text-xs text-slate-500 font-mono mt-1">{proof.id}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded flex items-center gap-1 ml-2">
                                        <CheckCircle className="w-3 h-3" />
                                        {proof.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-xs text-slate-600">{proof.time}</p>
                                    <p className="text-sm font-bold text-purple-400">{proof.count.toLocaleString()} results</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Export Statistics */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-cyan-400" />
                        Data Export Statistics
                    </h3>
                    <div className="space-y-4">
                        {exportStats.map((stat, index) => (
                            <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="font-bold text-white text-sm">{stat.type}</p>
                                    <span className="text-xs text-slate-500 uppercase">{stat.size}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden">
                                        <div className="bg-cyan-500 h-full" style={{ width: `${(stat.count / 50) * 100}%` }} />
                                    </div>
                                    <p className="text-lg font-bold text-cyan-400">{stat.count}</p>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 rounded-2xl border border-cyan-500/20">
                            <p className="text-xs text-slate-500 uppercase mb-1">Total Data Exported</p>
                            <p className="text-3xl font-bold text-white">4.2 GB</p>
                            <p className="text-xs text-green-400 flex items-center gap-1 mt-2">
                                <TrendingUp className="w-3 h-3" />
                                +18% this month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Network Stats */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Network className="w-5 h-5 text-green-400" />
                    Network Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {networkNodes.map((node, index) => (
                        <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <p className="font-bold text-white text-sm">{node.region}</p>
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Nodes</span>
                                    <span className="text-white font-bold">{node.nodes}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Latency</span>
                                    <span className="text-cyan-400 font-bold">{node.latency}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ZK-Query Portal & Population Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-purple-500/20 bg-purple-500/5 p-10 rounded-[3rem]">
                    <h3 className="font-bold mb-8 text-2xl flex items-center gap-3"><ZoomIn className="text-purple-400" /> ZK-Query Portal</h3>
                    <textarea className="w-full h-48 bg-slate-950 border border-slate-800 p-6 rounded-2xl text-purple-400 font-mono text-sm outline-none focus:border-purple-500 shadow-inner resize-none" placeholder="SELECT count(*) FROM Population WHERE age > 60 AND blood_group == 'O+'..." />
                    <Button className="mt-6 w-full bg-purple-600 hover:bg-purple-500 h-16 font-bold rounded-2xl text-lg shadow-xl shadow-purple-900/20">EXECUTE TRUSTLESS QUERY</Button>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[3rem]">
                    <h3 className="font-bold mb-8 text-2xl">Population Insights</h3>
                    <div className="space-y-8">
                        {[
                            { label: "Diabetes Prevalance", val: "14%", color: "bg-purple-500", trend: "+2.1%" },
                            { label: "Vaccination Coverage", val: "92%", color: "bg-cyan-500", trend: "+5.3%" },
                            { label: "Cardiac Risk Trend", val: "68%", color: "bg-red-500", trend: "-1.8%" }
                        ].map((s, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-sm uppercase font-bold tracking-widest text-slate-400">
                                    <span>{s.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{s.val}</span>
                                        <span className={`text-xs ${s.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                            {s.trend}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className={`h-full ${s.color} transition-all duration-1000`} style={{ width: s.val }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

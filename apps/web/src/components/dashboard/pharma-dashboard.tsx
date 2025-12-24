"use client";

import { useState, useEffect } from "react";
import { FlaskConical, TrendingUp, Database, ShoppingCart, DollarSign, ArrowUpRight } from "lucide-react";
import { MetricCard } from "./metric-card";

interface PurchasedLicense {
    datasetId: string;
    datasetTitle: string;
    purchaseDate: string;
    txHash: string;
    price: string;
}

export function PharmaDashboard() {
    const [purchasedLicenses, setPurchasedLicenses] = useState<PurchasedLicense[]>([]);
    const [totalSpent, setTotalSpent] = useState(0);

    // Load purchased licenses from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('purchasedLicenses');
        if (stored) {
            try {
                const licenses = JSON.parse(stored);
                setPurchasedLicenses(licenses);

                // Calculate total spent
                const total = licenses.reduce((sum: number, license: PurchasedLicense) => {
                    const price = parseFloat(license.price.replace(/[₹,]/g, '').trim()) || 0;
                    return sum + price;
                }, 0);
                setTotalSpent(total);
            } catch (e) {
                console.error('Failed to load purchased licenses:', e);
            }
        }

        // Listen for storage events
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'purchasedLicenses' && e.newValue) {
                try {
                    const licenses = JSON.parse(e.newValue);
                    setPurchasedLicenses(licenses);

                    const total = licenses.reduce((sum: number, license: PurchasedLicense) => {
                        const price = parseFloat(license.price.replace(/[₹,]/g, '').trim()) || 0;
                        return sum + price;
                    }, 0);
                    setTotalSpent(total);
                } catch (err) {
                    console.error('Failed to parse storage event:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const campaigns = [
        { title: "Diabetes Phase III", budget: "₹ 15.0L", participants: "12,400", target: "15,000", color: "bg-indigo-500", progress: 83 },
        { title: "Cardiac Monitoring", budget: "₹ 8.5L", participants: "4,200", target: "6,000", color: "bg-blue-500", progress: 70 }
    ];

    const spendingData = {
        thisMonth: totalSpent || 625000,
        lastMonth: 450000,
        change: totalSpent ? ((totalSpent - 450000) / 450000 * 100).toFixed(1) : "+38.9"
    };

    const datasetUsage = [
        { name: "Diabetes Cohort", downloads: 42, queries: 128, status: "Active" },
        { name: "Cardiac Study", downloads: 28, queries: 89, status: "Active" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Enhanced Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Active Campaigns" value="06" subtitle="Targeting 50k+ patients" />
                <MetricCard title="NIROG Wallet" value="₹ 4.2L" subtitle="Available for data purchase" />
                <MetricCard title="Data Purchased" value={purchasedLicenses.length > 0 ? `${purchasedLicenses.length} Sets` : "1.2TB"} subtitle="Encrypted de-identified sets" />
                <MetricCard title="Total Spent" value={`₹ ${(spendingData.thisMonth / 100000).toFixed(1)}L`} subtitle={`${spendingData.change}% vs last month`} color="text-cyan-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spending Analytics */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        Spending Analytics
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase mb-1">This Month</p>
                            <p className="text-3xl font-bold text-white">₹ {(spendingData.thisMonth / 100000).toFixed(2)}L</p>
                            <p className="text-xs text-green-400 flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-3 h-3" />
                                {spendingData.change}% increase
                            </p>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase mb-1">Last Month</p>
                            <p className="text-2xl font-bold text-slate-400">₹ {(spendingData.lastMonth / 100000).toFixed(2)}L</p>
                        </div>
                    </div>
                </div>

                {/* Dataset Usage */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-400" />
                        Dataset Usage
                    </h3>
                    <div className="space-y-3">
                        {datasetUsage.map((dataset, index) => (
                            <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-bold text-white text-sm">{dataset.name}</p>
                                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded">
                                        {dataset.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <p className="text-xs text-slate-500">Downloads</p>
                                        <p className="text-lg font-bold text-cyan-400">{dataset.downloads}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Queries</p>
                                        <p className="text-lg font-bold text-purple-400">{dataset.queries}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Purchases */}
            {purchasedLicenses.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-green-400" />
                        Recent Purchases ({purchasedLicenses.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {purchasedLicenses.slice(0, 4).map((license, index) => (
                            <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all">
                                <p className="font-bold text-white text-sm mb-2">{license.datasetTitle}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            {new Date(license.purchaseDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-slate-600 font-mono mt-1">
                                            {license.txHash.slice(0, 15)}...
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-green-400">{license.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Research Trials */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[3rem]">
                <h3 className="font-bold mb-8 text-2xl flex items-center gap-3 text-white"><FlaskConical className="text-indigo-400" /> Active Research Trials</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.map((c, i) => (
                        <div key={i} className="p-8 bg-slate-950/40 border border-slate-800 rounded-3xl space-y-6 hover:border-indigo-500/30 transition-all cursor-pointer group">
                            <div className="flex justify-between font-bold items-center text-xl">
                                <span>{c.title}</span>
                                <span className="text-indigo-400 text-lg">{c.budget}</span>
                            </div>
                            <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                                <div className={`h-full ${c.color} transition-all duration-1000`} style={{ width: `${c.progress}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                <span>{c.participants} Consented</span>
                                <span>Goal: {c.target}</span>
                            </div>
                            <div className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <TrendingUp className="w-4 h-4 inline mr-1" />
                                {c.progress}% Complete
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

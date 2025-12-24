"use client";

import { useState, useEffect } from "react";
import { Activity, PieChart, TrendingUp, Users, DollarSign, Target, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PurchasedLicense {
    datasetId: string;
    datasetTitle: string;
    purchaseDate: string;
    txHash: string;
    price: string;
}

export function PharmaROIView() {
    const [viewMode, setViewMode] = useState("monthly");
    const [purchasedLicenses, setPurchasedLicenses] = useState<PurchasedLicense[]>([]);

    // Load purchased licenses and listen for changes
    useEffect(() => {
        const loadLicenses = () => {
            const stored = localStorage.getItem('purchasedLicenses');
            if (stored) {
                try {
                    setPurchasedLicenses(JSON.parse(stored));
                } catch (e) {
                    console.error('Failed to load purchased licenses:', e);
                }
            }
        };

        // Load initial data
        loadLicenses();

        // Listen for storage events from other tabs/components
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'purchasedLicenses') {
                loadLicenses();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Calculate total spending from purchased licenses
    const totalSpent = purchasedLicenses.reduce((sum, license) => {
        const price = parseFloat(license.price.replace(/[₹,]/g, '').trim()) || 0;
        return sum + price;
    }, 0);

    const campaigns = [
        {
            id: 1,
            name: "Diabetes Management Study",
            enrolled: 1250,
            target: 2000,
            spent: "₹ 1,77,500",
            roi: "+340%",
            status: "active"
        },
        {
            id: 2,
            name: "Cardiac Health Research",
            enrolled: 890,
            target: 1000,
            spent: "₹ 1,26,380",
            roi: "+285%",
            status: "active"
        },
        {
            id: 3,
            name: "Mental Wellness Survey",
            enrolled: 2340,
            target: 2500,
            spent: "₹ 3,32,280",
            roi: "+412%",
            status: "completing"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3"><Activity className="text-indigo-400" /> Campaign ROI Analytics</h2>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                    <button onClick={() => setViewMode("weekly")} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${viewMode === 'weekly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>WEEKLY</button>
                    <button onClick={() => setViewMode("monthly")} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${viewMode === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>MONTHLY</button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-indigo-500/20 border-2 rounded-3xl hover:border-indigo-500/40 transition-all group">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs uppercase text-slate-400 flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-400" />
                            Total Outreach
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors">{viewMode === 'monthly' ? "2.4M" : "600K"}</div>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +14% MoM
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-indigo-500/20 border-2 rounded-3xl hover:border-indigo-500/40 transition-all group">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs uppercase text-slate-400 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-indigo-400" />
                            Avg. Consent Cost
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors">₹ 142</div>
                        <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            -5% Efficiency Gain
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-indigo-500/20 border-2 rounded-3xl hover:border-indigo-500/40 transition-all group">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs uppercase text-slate-400 flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-400" />
                            Patient Conversion
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors">2.82%</div>
                        <p className="text-xs text-slate-500 mt-2">Benchmark: 2.5%</p>
                    </CardContent>
                </Card>
            </div>

            {/* Campaign Performance */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{campaign.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">Campaign #{campaign.id}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${campaign.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                {campaign.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-950 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase mb-1">Enrolled</p>
                                <p className="text-2xl font-bold text-white">{campaign.enrolled.toLocaleString()}</p>
                                <p className="text-xs text-slate-600 mt-1">of {campaign.target.toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase mb-1">Progress</p>
                                <p className="text-2xl font-bold text-indigo-400">{Math.round((campaign.enrolled / campaign.target) * 100)}%</p>
                                <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                                    <div className="bg-indigo-500 h-1 rounded-full transition-all" style={{ width: `${(campaign.enrolled / campaign.target) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase mb-1">Spent</p>
                                <p className="text-2xl font-bold text-white">{campaign.spent}</p>
                                <p className="text-xs text-slate-600 mt-1">Total cost</p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase mb-1">ROI</p>
                                <p className="text-2xl font-bold text-green-400">{campaign.roi}</p>
                                <p className="text-xs text-green-600 mt-1">Return rate</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Purchased Licenses - Real-time Updates */}
            {purchasedLicenses.length > 0 && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-green-400" />
                            Purchased Licenses ({purchasedLicenses.length})
                        </h3>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase">Total Spent</p>
                            <p className="text-2xl font-bold text-green-400">₹ {totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {purchasedLicenses.map((license, index) => (
                            <div key={index} className="bg-slate-900 border border-green-500/20 rounded-2xl p-4 hover:border-green-500/40 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-white text-sm">{license.datasetTitle}</h4>
                                    <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Acquired</span>
                                </div>
                                <div className="space-y-1 text-xs">
                                    <p className="text-slate-500">
                                        <span className="text-slate-600">Date:</span> {new Date(license.purchaseDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-slate-500 font-mono">
                                        <span className="text-slate-600">TX:</span> {license.txHash.slice(0, 20)}...
                                    </p>
                                    <p className="text-green-400 font-bold text-sm mt-2">{license.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Chart Visualization */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Campaign Performance Overview</h3>
                    <span className="text-xs text-slate-500 uppercase">ROI Comparison</span>
                </div>

                {/* Bar Chart */}
                <div className="space-y-4">
                    {campaigns.map((campaign, index) => {
                        const roiValue = parseInt(campaign.roi.replace(/[+%]/g, ''));
                        const maxROI = 450;
                        const barWidth = (roiValue / maxROI) * 100;

                        return (
                            <div key={campaign.id} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-400">{campaign.name}</span>
                                    <span className="text-sm font-bold text-green-400">{campaign.roi}</span>
                                </div>
                                <div className="relative h-12 bg-slate-950 rounded-xl overflow-hidden">
                                    <div
                                        className={`absolute inset-y-0 left-0 rounded-xl transition-all duration-1000 ease-out ${index === 0 ? 'bg-gradient-to-r from-indigo-500 to-indigo-400' :
                                                index === 1 ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
                                                    'bg-gradient-to-r from-green-500 to-green-400'
                                            } group-hover:opacity-90`}
                                        style={{ width: `${barWidth}%` }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-end pr-4">
                                            <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                {campaign.enrolled.toLocaleString()} enrolled
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex gap-6 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
                        <span className="text-xs text-slate-500">Campaign 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-500 to-cyan-400"></div>
                        <span className="text-xs text-slate-500">Campaign 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-green-400"></div>
                        <span className="text-xs text-slate-500">Campaign 3</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

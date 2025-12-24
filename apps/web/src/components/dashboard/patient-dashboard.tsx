"use client";

import { useState, useEffect } from "react";
import { Wallet, Upload, FileCheck, TrendingUp, Calendar, Activity, Shield, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NirogBharatCard } from "@/components/nirog-card";
import { MetricCard } from "./metric-card";

interface PatientDashboardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any;
}

export function PatientDashboard({ session }: PatientDashboardProps) {
    const [earnings, setEarnings] = useState(0);
    const [records, setRecords] = useState(0);
    const [healthScore, setHealthScore] = useState(0);

    // Animate numbers on mount
    useEffect(() => {
        const animateValue = (setter: (val: number) => void, target: number, duration: number) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setter(target);
                    clearInterval(timer);
                } else {
                    setter(Math.floor(current));
                }
            }, 16);
        };

        animateValue(setEarnings, 35420, 1000);
        animateValue(setRecords, 28, 800);
        animateValue(setHealthScore, 88, 1200);
    }, []);

    const recentActivity = [
        { id: 1, type: "upload", title: "Blood Test Report Uploaded", time: "2 hours ago", icon: Upload, color: "text-blue-400", bg: "bg-blue-500/10" },
        { id: 2, type: "consent", title: "Consent Granted to Dr. Sharma", time: "5 hours ago", icon: Shield, color: "text-green-400", bg: "bg-green-500/10" },
        { id: 3, type: "earning", title: "Earned ₹250 from Data Access", time: "1 day ago", icon: Wallet, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    ];

    const quickActions = [
        { title: "Upload Record", icon: Upload, color: "bg-blue-600 hover:bg-blue-500" },
        { title: "Grant Consent", icon: Shield, color: "bg-green-600 hover:bg-green-500" },
        { title: "View Wallet", icon: Wallet, color: "bg-cyan-600 hover:bg-cyan-500" },
    ];

    const upcomingAppointments = [
        { doctor: "Dr. Rajesh Sharma", specialty: "Cardiologist", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
        { doctor: "Dr. Priya Patel", specialty: "General Physician", date: "Dec 26, 2:30 PM", status: "Pending" },
    ];

    const dataSharing = [
        { accessor: "Apollo Hospital", date: "Dec 22", earnings: "₹150" },
        { accessor: "Dr. Sharma", date: "Dec 20", earnings: "₹100" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Enhanced Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 border-none text-white overflow-hidden relative shadow-2xl rounded-3xl group hover:scale-105 transition-transform duration-300">
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity"><Wallet size={160} /></div>
                    <CardHeader><CardTitle className="text-xs font-bold uppercase tracking-widest opacity-80 underline underline-offset-4">Sovereign Earnings</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-5xl font-black tracking-tighter">₹ {earnings.toLocaleString()}</div>
                        <p className="text-xs mt-3 opacity-90 font-mono tracking-widest uppercase flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            NIROG TOKENS: 428.50
                        </p>
                        <p className="text-xs mt-2 opacity-70 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" />
                            +12% this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800 border-2 rounded-3xl hover:border-blue-500/30 transition-all group">
                    <CardHeader><CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Digitized Records</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-5xl font-black text-white">{records}</div>
                        <p className="text-xs mt-3 text-green-400 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" />
                            +4 Added and verified
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800 border-2 rounded-3xl hover:border-green-500/30 transition-all group">
                    <CardHeader><CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Bharat Health Score</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-5xl font-black text-green-400">{healthScore}%</div>
                        <p className="text-xs mt-3 text-slate-500 uppercase">OPTIMAL CO-MORBIDITY PROFILE</p>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-3">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${healthScore}%` }}></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <Button
                            key={index}
                            className={`${action.color} h-16 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all hover:scale-105`}
                        >
                            <action.icon className="w-5 h-5" />
                            {action.title}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity Timeline */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group">
                                <div className={`p-3 ${activity.bg} rounded-xl`}>
                                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm">{activity.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        Upcoming Appointments
                    </h3>
                    <div className="space-y-3">
                        {upcomingAppointments.map((apt, index) => (
                            <div key={index} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-bold text-white text-sm">{apt.doctor}</p>
                                        <p className="text-xs text-slate-500">{apt.specialty}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${apt.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <p className="text-xs text-cyan-400 flex items-center gap-1 mt-2">
                                    <Calendar className="w-3 h-3" />
                                    {apt.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Data Sharing Stats */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    Recent Data Access
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataSharing.map((share, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <div>
                                <p className="font-bold text-white text-sm">{share.accessor}</p>
                                <p className="text-xs text-slate-500 mt-1">{share.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-green-400">{share.earnings}</p>
                                <p className="text-xs text-slate-600">Earned</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <NirogBharatCard abhaId={session?.user?.id || "NB-PATIENT-1234"} />
        </div>
    );
}

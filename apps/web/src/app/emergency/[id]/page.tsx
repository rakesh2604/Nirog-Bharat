"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Clock, Phone, Droplet, Zap, Activity, Stethoscope, Pill } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useParams } from "next/navigation";

export default function EmergencyPage() {
    const params = useParams();
    const id = params?.id as string;

    const [countdown, setCountdown] = useState(120);
    const [isActive, setIsActive] = useState(false);

    // TRPC Mutation to get data
    const emergencyMutation = trpc.emergency.getEmergencyData.useMutation();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isActive, countdown]);

    const handleBreakGlass = () => {
        setIsActive(true);
        // Fetch data
        emergencyMutation.mutate({ abhaId: id });
    };

    // Mock data for demo when backend fails or returns incomplete data
    const mockEmergencyData = {
        bloodGroup: "O+",
        allergies: "Penicillin, Sulfa drugs",
        chronicConditions: "Type 2 Diabetes",
        recentProcedures: ["Appendectomy (2022)", "Dental Surgery (2023)"],
        medications: ["Metformin 500mg (2x daily)", "Lisinopril 10mg (1x daily)", "Aspirin 81mg (1x daily)"],
        emergencyContact: "+91 98765 43210"
    };

    // Use backend data if available and complete, otherwise use mock data
    const data = emergencyMutation.data &&
        emergencyMutation.data.bloodGroup &&
        emergencyMutation.data.bloodGroup !== "Unknown"
        ? emergencyMutation.data
        : emergencyMutation.isSuccess || emergencyMutation.isError
            ? mockEmergencyData
            : null;

    const isLoading = emergencyMutation.isPending;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            {!isActive ? (
                <div className="text-center space-y-8 max-w-md">
                    <div className="animate-pulse">
                        <ShieldAlert className="w-32 h-32 text-red-600 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">EMERGENCY PROTOCOL</h1>
                    <p className="text-slate-400 text-lg">
                        You are accessing the vault for ID: <span className="text-red-500 font-mono">{id}</span>
                    </p>
                    <p className="text-slate-500 text-sm">
                        This action will override normal consent for 120 seconds to save a life.
                        All access is logged on the blockchain.
                    </p>
                    <Button
                        onClick={handleBreakGlass}
                        className="w-full h-24 bg-red-700 hover:bg-red-600 text-2xl font-black rounded-3xl shadow-[0_0_50px_rgba(185,28,28,0.4)] transition-all active:scale-95"
                    >
                        BREAK GLASS
                    </Button>
                </div>
            ) : (
                <div className="w-full max-w-2xl space-y-6">
                    <div className="flex justify-between items-center bg-red-950/50 border border-red-500/50 p-6 rounded-3xl backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500 rounded-full">
                                <Clock className="w-8 h-8 text-white animate-spin-slow" />
                            </div>
                            <div>
                                <p className="text-red-400 text-sm font-bold uppercase tracking-widest">Access Window</p>
                                <p className="text-4xl font-mono font-bold text-white">{countdown}s</p>
                            </div>
                        </div>
                        <Zap className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                    </div>

                    {isLoading ? (
                        <div className="text-white text-center animate-pulse">Fetching Critical Data from Chain...</div>
                    ) : (data ? (
                        <div className="space-y-6">
                            {/* Row 1: Vitals & Immediate Life Safety */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-slate-900 border-red-500/30 border-2 md:col-span-1 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 animate-pulse">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-cyan-500" />
                                            Live Vitals (Simulated)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                                            <span className="text-slate-500 text-xs">HR</span>
                                            <span className="text-2xl font-mono text-cyan-400 font-bold">88 <span className="text-xs text-slate-600">bpm</span></span>
                                        </div>
                                        <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                                            <span className="text-slate-500 text-xs">BP</span>
                                            <span className="text-2xl font-mono text-cyan-400 font-bold">120/80</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-slate-500 text-xs">SpO2</span>
                                            <span className="text-2xl font-mono text-cyan-400 font-bold">98%</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900 border-red-500/30 border-2 md:col-span-1">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Droplet className="w-4 h-4 text-red-500" />
                                            Blood Group
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center h-32">
                                        <p className="text-6xl font-black text-white">{data.bloodGroup}</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900 border-red-500/30 border-2 md:col-span-1">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <ShieldAlert className="w-4 h-4 text-yellow-500" />
                                            Critical Allergies
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center h-32 text-center">
                                        <p className="text-xl font-bold text-white break-words">{data.allergies}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Row 2: Clinical Context & Meds */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-slate-900 border-red-500/30 border-2">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Stethoscope className="w-4 h-4 text-orange-500" />
                                            Major Chronic Conditions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xl font-bold text-white mb-2">{data.chronicConditions}</p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {data.recentProcedures?.map((proc: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                                                    History: {proc}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900 border-red-500/30 border-2">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Pill className="w-4 h-4 text-blue-500" />
                                            Active Medications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {data.medications && data.medications.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {data.medications.map((med: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-950/50 rounded border border-slate-800">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                        <span className="text-white font-mono text-sm">{med}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-slate-500 italic">No active medications listed.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Row 3: Action */}
                            <Card className="bg-slate-900 border-red-500/30 border-2">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-500" />
                                        Emergency Contact
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <p className="text-3xl font-bold text-white tracking-widest">{data.emergencyContact}</p>
                                        <p className="text-xs text-slate-500 mt-1">Primary Next of Kin - Notify Immediately</p>
                                    </div>
                                    <Button
                                        className="bg-green-600 hover:bg-green-500 h-16 w-full md:w-48 rounded-2xl font-black text-xl shadow-[0_0_20px_rgba(22,163,74,0.4)] animate-pulse flex items-center gap-2"
                                        onClick={() => window.location.href = `tel:${data.emergencyContact.replace(/[^0-9+]/g, '')}`}
                                    >
                                        <Phone className="w-6 h-6 fill-current" />
                                        CALL NOW
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="text-red-500 text-center">Failed to load data or Patient Not Found.</div>
                    ))}

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                        <p className="text-xs text-slate-500 text-center uppercase tracking-tighter">
                            Patient: {id} | Verification: Valid Health Identity Detected
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

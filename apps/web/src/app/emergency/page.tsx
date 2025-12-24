"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, QrCode, ArrowRight, Siren } from "lucide-react";

export default function EmergencyLandingPage() {
    const [patientId, setPatientId] = useState("");
    const router = useRouter();

    const handleAccess = (e: React.FormEvent) => {
        e.preventDefault();
        if (patientId.trim()) {
            router.push(`/emergency/${patientId.trim()}`);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black animate-pulse" />
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.5)]" />

            <div className="relative z-10 w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-50 animate-pulse" />
                            <Siren className="w-20 h-20 text-red-500 relative z-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                        Emergency Protocol
                    </h1>
                    <p className="text-red-400 text-sm font-mono tracking-widest border border-red-900/50 bg-red-950/30 p-2 rounded inline-block">
                        UNAUTHORIZED ACCESS IS PROHIBITED
                    </p>
                </div>

                <Card className="bg-slate-900/80 border-red-600/30 backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <ShieldAlert className="text-red-500" />
                            Identify Patient
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleAccess} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400 uppercase font-bold tracking-widest">
                                    Manual Entry
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter Patient ID (e.g. NB-PATIENT-221)"
                                        className="bg-black/50 border-slate-700 text-white font-mono placeholder:text-slate-600 h-12"
                                        value={patientId}
                                        onChange={(e) => setPatientId(e.target.value)}
                                    />
                                    <Button type="submit" className="bg-red-600 hover:bg-red-500 h-12 px-4">
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500">Or Scan Identity</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full h-16 border-dashed border-slate-700 hover:border-red-500 hover:bg-red-950/10 text-slate-400 hover:text-red-400 gap-4 transition-all"
                            onClick={() => alert("Scanner Hardware Not Detected. Please use manual entry.")}
                        >
                            <QrCode className="w-6 h-6" />
                            ACTIVATE BIOMETRIC SCANNER
                        </Button>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-slate-600 max-w-xs mx-auto">
                    All access attempts are cryptographically signed and logged on the immutable health ledger.
                </p>
            </div>
        </div>
    );
}

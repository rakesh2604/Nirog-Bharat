"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, ShieldCheck, Stethoscope, Building2, SearchIcon } from "lucide-react";
function SignInForm() {
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") || "patient";
    const [role, setRole] = useState(initialRole);
    const [abhaId, setAbhaId] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const roleFromParams = searchParams.get("role");
    if (roleFromParams && roleFromParams !== role) {
        setRole(roleFromParams);
    }

    const handleBiometricAuth = async () => {
        setIsAuthenticating(true);
        // Passing role explicitly to authorize
        await signIn("credentials", {
            abhaId: abhaId || `NB-${role.toUpperCase()}-123456`,
            role: role,
            callbackUrl: "/dashboard"
        });
    };

    const getRoleIcon = () => {
        switch (role) {
            case "doctors": return <Stethoscope className="w-10 h-10 text-blue-500" />;
            case "pharma": return <Building2 className="w-10 h-10 text-indigo-500" />;
            case "researchers": return <SearchIcon className="w-10 h-10 text-purple-500" />;
            default: return <ShieldCheck className="w-10 h-10 text-cyan-500" />;
        }
    };

    const getRoleName = () => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
            <CardHeader className="text-center space-y-1">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-slate-800 rounded-2xl ring-1 ring-slate-700/50">
                        {getRoleIcon()}
                    </div>
                </div>
                <CardTitle className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                    {getRoleName()} Portal
                </CardTitle>
                <CardDescription className="text-slate-400 font-medium">
                    Biometric Gateway to Sovereign Bharat
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="abha" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {role === 'patient' || role === 'patients' ? 'ABHA ID / Health Identification' : 'Organization / License ID'}
                    </Label>
                    <Input
                        id="abha"
                        placeholder={role === 'patient' || role === 'patients' ? "NB-0000-0000-0000" : "LIC-XYZ-123"}
                        className="h-12 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:ring-cyan-500/20 rounded-xl"
                        value={abhaId}
                        onChange={(e) => setAbhaId(e.target.value)}
                    />
                </div>
                <Button
                    className="w-full h-14 bg-white text-slate-950 hover:bg-slate-200 font-black transition-all rounded-2xl shadow-xl hover:scale-[1.01] active:scale-95 flex items-center gap-3"
                    onClick={handleBiometricAuth}
                    disabled={isAuthenticating}
                >
                    {isAuthenticating ? (
                        <span className="flex items-center gap-3">
                            <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            AUTHORIZING...
                        </span>
                    ) : (
                        <>
                            <Fingerprint className="w-6 h-6 shrink-0" />
                            SIGN IN WITH BIOMETRICS
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}

export default function SignIn() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            <Suspense fallback={<div>Loading...</div>}>
                <SignInForm />
            </Suspense>
        </div>
    );
}

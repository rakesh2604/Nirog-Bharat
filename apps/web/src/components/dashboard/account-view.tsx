"use client";

import { useState, useEffect } from "react";
import {
    Users, Lock, Eye, CreditCard, ShieldCheck,
    Smartphone, CheckCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NirogBharatCard } from "@/components/nirog-card";

interface Profile {
    name: string;
    abha: string;
    email: string;
    mobile: string;
    specialization?: string;
    clinic?: string;
    hq?: string;
    dept?: string;
}

interface PrivacyItem {
    id: number;
    title: string;
    desc: string;
    active: boolean;
}

interface Security {
    biometric: boolean;
    hardware: boolean;
}

interface Session {
    user?: {
        name?: string | null;
        id?: string | null;
        role?: string | null;
    } | null;
}

interface AccountViewProps {
    session: Session | null;
    role: string;
    showToast: (msg: string, type?: "success" | "error") => void;
}

export function AccountView({ session, role, showToast }: AccountViewProps) {
    const [innerTab, setInnerTab] = useState("profile");
    const isDoctor = role === 'doctor' || role === 'doctors';
    const isPharma = role === 'pharma';
    const isResearcher = role === 'researcher' || role === 'researchers';

    // Profile State
    const [profile, setProfile] = useState<Profile>({
        name: session?.user?.name || (isDoctor ? "Dr. Rakesh Gupta" : isPharma ? "MediCorp India Ltd." : isResearcher ? "Dr. S. K. Bose" : "Akash Singh"),
        abha: session?.user?.id || (isDoctor ? "NMC-REG-29291" : isPharma ? "CORP-LIC-8892" : isResearcher ? "G-2024-INDI" : "12-3456-7890-1234"),
        email: isDoctor ? "dr.rakesh@columbia.asia" : isPharma ? "trials@medicorp.in" : isResearcher ? "research@iisc.ac.in" : "akash@nirog.bh",
        mobile: "+91 98XXX XXX10",
        specialization: "Cardiology, Interventional",
        clinic: "Max Super Speciality, Saket",
        hq: "Cyber City, Gurugram",
        dept: "Epidemiology"
    });

    // Security State
    const [security, setSecurity] = useState<Security>({
        biometric: true,
        hardware: isDoctor || isPharma || isResearcher // Professionals prefer hardware keys
    });

    // Privacy States
    const doctorPrivacy: PrivacyItem[] = [
        { id: 1, title: "Accept Emergency Calls", desc: "Allow critical break-glass requests directly.", active: true },
        { id: 2, title: "Public Directory Listing", desc: "Visible in national specialist registry.", active: true },
        { id: 3, title: "Research Contribution", desc: "Share anonymized practice stats.", active: false }
    ];

    const pharmaPrivacy: PrivacyItem[] = [
        { id: 1, title: "Public Trial Registry", desc: "List active trials in the open marketplace.", active: true },
        { id: 2, title: "ROI Data Sharing", desc: "Share aggregate trial efficiency with partners.", active: true },
        { id: 3, title: "Auto-Approve Grants", desc: "Automatically fund matching cohorts < ₹5L.", active: false }
    ];

    const researcherPrivacy: PrivacyItem[] = [
        { id: 1, title: "Open Data Contributor", desc: "Push sanitized datasets to public commons.", active: true },
        { id: 2, title: "Peer Review Visibility", desc: "Allow peers to audit ZK-Query logs.", active: true },
        { id: 3, title: "Node Participation", desc: "Run a light validation node for the network.", active: true }
    ];

    const patientPrivacy: PrivacyItem[] = [
        { id: 1, title: "Public Research Participation", desc: "Allow anonymized inclusion in ZK-Queries.", active: true },
        { id: 2, title: "Emergency Break-Glass", desc: "Enable triage access in critical states.", active: true },
        { id: 3, title: "Pharma Ad-Match", desc: "Receive targeted clinical trial invites.", active: false }
    ];

    const [privacy, setPrivacy] = useState<PrivacyItem[]>(
        isDoctor ? doctorPrivacy :
            isPharma ? pharmaPrivacy :
                isResearcher ? researcherPrivacy :
                    patientPrivacy
    );

    // Persistence & Initialization with Hydration Safety
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const load = (key: string, setter: (data: any) => void) => {
            try {
                const saved = localStorage.getItem(`nirog-${key}-${role}`);
                if (saved) setter(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load local settings", e);
            }
        };
        load('profile', setProfile);
        load('security', setSecurity);
        load('privacy', setPrivacy);
    }, [role]);

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleSaveProfile = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            localStorage.setItem(`nirog-profile-${role}`, JSON.stringify(profile));
            localStorage.setItem(`nirog-security-${role}`, JSON.stringify(security));
            localStorage.setItem(`nirog-privacy-${role}`, JSON.stringify(privacy));

            setSaveStatus('saved');
            showToast("Profile Privacy Settings Updated Successfully!");
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);
    };

    const togglePrivacy = (id: number) => {
        setPrivacy(prev => {
            const updated = prev.map(p => p.id === id ? { ...p, active: !p.active } : p);
            return updated;
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center gap-8 bg-slate-900/40 p-10 rounded-[3rem] border border-slate-800">
                <div className="w-24 h-24 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                    {session?.user?.name?.[0] || role[0].toUpperCase()}
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-black text-white">{profile.name}</h2>
                        <span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black uppercase text-cyan-400 tracking-tighter border border-cyan-500/20">{role}</span>
                    </div>
                    <p className="text-slate-500 font-mono text-sm flex items-center gap-2">
                        <ShieldCheck size={16} className="text-green-500" /> Identity Verified: {session?.user?.id || "NB-USER-001"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="lg:col-span-1 space-y-2">
                    <AccountSideBtn
                        icon={<Users size={18} />}
                        label="Public Profile"
                        active={innerTab === "profile"}
                        onClick={() => setInnerTab("profile")}
                    />
                    <AccountSideBtn
                        icon={<Lock size={18} />}
                        label="Security & Auth"
                        active={innerTab === "security"}
                        onClick={() => setInnerTab("security")}
                    />
                    <AccountSideBtn
                        icon={<Eye size={18} />}
                        label="Privacy Control"
                        active={innerTab === "privacy"}
                        onClick={() => setInnerTab("privacy")}
                    />
                    <AccountSideBtn
                        icon={<CreditCard size={18} />}
                        label="Sovereign Cards"
                        active={innerTab === "cards"}
                        onClick={() => setInnerTab("cards")}
                    />
                </div>

                <div className="lg:col-span-3">
                    {innerTab === "profile" && (
                        <div className="space-y-8 p-8 bg-slate-900/20 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-bold mb-6">
                                {isDoctor ? 'Professional Information' :
                                    isPharma ? 'Corporate Identity' :
                                        isResearcher ? 'Academic Credentials' : 'Personal Information'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AccountInput
                                    label={isPharma ? "Company Name" : isResearcher ? "Institution Name" : "Full Name"}
                                    value={profile.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, name: e.target.value })}
                                />
                                <AccountInput
                                    label={isDoctor ? "Medical License ID" : isPharma ? "Corporate License" : isResearcher ? "Grant ID" : "ABHA ID"}
                                    value={profile.abha}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, abha: e.target.value })}
                                />
                                <AccountInput
                                    label={isDoctor || isResearcher ? "Work Email" : isPharma ? "Official Contact" : "Email Verified"}
                                    value={profile.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, email: e.target.value })}
                                />
                                {isPharma ? (
                                    <AccountInput
                                        label="HQ Address"
                                        value={profile.hq || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, hq: e.target.value })}
                                    />
                                ) : isResearcher ? (
                                    <AccountInput
                                        label="Department"
                                        value={profile.dept || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, dept: e.target.value })}
                                    />
                                ) : (
                                    <AccountInput
                                        label="Mobile"
                                        value={profile.mobile}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, mobile: e.target.value })}
                                    />
                                )}

                                {isDoctor && (
                                    <>
                                        <AccountInput
                                            label="Specialization"
                                            value={profile.specialization || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, specialization: e.target.value })}
                                        />
                                        <AccountInput
                                            label="Clinic Address"
                                            value={profile.clinic || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, clinic: e.target.value })}
                                        />
                                    </>
                                )}
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saveStatus === 'saving'}
                                className={`font-bold px-8 rounded-xl h-12 transition-all duration-500 overflow-hidden relative ${saveStatus === 'saved' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
                            >
                                <div className="flex items-center gap-2">
                                    {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {saveStatus === 'saved' ? <><CheckCircle className="w-5 h-5" /> CHANGES SAVED</> : saveStatus === 'saving' ? "UPDATING LEDGER..." : "SAVE CHANGES"}
                                </div>
                            </Button>
                        </div>
                    )}

                    {innerTab === "security" && (
                        <div className="space-y-8 p-8 bg-slate-900/20 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-bold mb-6">Security & Authentication</h3>
                            <div className="space-y-6">
                                <SecurityToggle
                                    title="Biometric Sign-in"
                                    desc="Use WebAuthn / FaceID for instant access."
                                    status={security.biometric}
                                    icon={<Smartphone className="text-cyan-400" />}
                                    onToggle={() => setSecurity({ ...security, biometric: !security.biometric })}
                                />
                                <SecurityToggle
                                    title="Hardware Key (FIDO2)"
                                    desc="Require a physical key for critical data access."
                                    status={security.hardware}
                                    icon={<Lock className="text-blue-400" />}
                                    onToggle={() => setSecurity({ ...security, hardware: !security.hardware })}
                                />
                                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-white">Cryptographic Recovery Phrase</p>
                                        <p className="text-xs text-slate-500 mt-1">Stored securely on-device.</p>
                                    </div>
                                    <Button variant="outline" className="border-slate-800 text-xs font-bold">REVEAL</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {innerTab === "privacy" && (
                        <div className="space-y-8 p-8 bg-slate-900/20 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-bold mb-6">Data Sovereignty Preferences</h3>
                            <div className="space-y-4">
                                {privacy.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center p-6 bg-slate-950/20 border border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-900/50 transition-colors"
                                        onClick={() => togglePrivacy(p.id)}
                                    >
                                        <div className="max-w-md">
                                            <p className="font-bold text-white">{p.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${p.active ? 'bg-cyan-600' : 'bg-slate-800'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${p.active ? 'translate-x-6' : ''}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {innerTab === "cards" && (
                        <div className="space-y-8 p-8 bg-slate-900/20 border border-slate-800 rounded-[2.5rem]">
                            <h3 className="text-xl font-bold mb-6">Nirog Card Customization</h3>
                            <div className="flex flex-col items-center gap-10">
                                <div className="scale-75 md:scale-100 origin-center">
                                    <NirogBharatCard abhaId={session?.user?.id || "NB-USER-1234"} />
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Button variant="outline" className="h-14 border-slate-800 font-bold gap-2"><Smartphone size={18} /> ADD TO GOOGLE WALLET</Button>
                                    <Button variant="outline" className="h-14 border-slate-800 font-bold gap-2"><Eye size={18} /> GENERATE QR PRIVACY MASK</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface SideBtnProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

function AccountSideBtn({ icon, label, active, onClick }: SideBtnProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold' : 'text-slate-400 hover:bg-slate-900 border border-transparent'}`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}

interface AccountInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AccountInput({ label, value, onChange }: AccountInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
            <input
                value={value}
                onChange={onChange}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white text-sm outline-none focus:border-cyan-500 transition-all font-mono"
            />
        </div>
    );
}

interface SecurityToggleProps {
    title: string;
    desc: string;
    status: boolean;
    icon: React.ReactNode;
    onToggle: () => void;
}

function SecurityToggle({ title, desc, status, icon, onToggle }: SecurityToggleProps) {
    return (
        <div className="flex justify-between items-center p-6 bg-slate-950/20 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition-all" onClick={onToggle}>
            <div className="flex items-center gap-5">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 transition-colors group-hover:border-slate-700">{icon}</div>
                <div>
                    <p className="font-bold text-white transition-colors">{title}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${status ? 'bg-green-600' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${status ? 'translate-x-6' : ''}`} />
            </div>
        </div>
    );
}

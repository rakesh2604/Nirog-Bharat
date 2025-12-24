"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Home, ShieldAlert, Activity, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";

interface Study {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    participants: number;
    creatorId: string | null;
    tags?: string[];
    color?: string;
    requirements?: string[];
    steps?: string[];
    reward?: string;
}


export function MarketplaceView() {
    const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
    const [participationStatus, setParticipationStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [consentChecked, setConsentChecked] = useState(false);
    const [enrolledStudies, setEnrolledStudies] = useState<string[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [forceShowData, setForceShowData] = useState(false);

    const { data: marketplaceStudies = [], isLoading, error } = trpc.pharma.getMarketplace.useQuery(undefined, {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 30000,
    });

    // Auto-show data after 2 seconds if still loading (for demo)
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setForceShowData(true);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    // Mock data for demo if backend is slow or fails
    const mockStudies: Study[] = [
        {
            id: 'study-1',
            createdAt: new Date().toISOString(),
            title: 'Diabetes Management Study',
            description: 'Help us understand diabetes management patterns in India',
            price: '1200',
            currency: 'INR',
            participants: 150,
            creatorId: 'pharma-1',
            tags: ['DIABETES', 'CHRONIC'],
            color: 'text-green-500',
            requirements: ['Age 18-65', 'Diagnosed with Type 2 Diabetes', 'No other chronic conditions'],
            steps: ['Complete health questionnaire', 'Share glucose readings', 'Monthly check-ins'],
            reward: '₹ 1,200'
        },
        {
            id: 'study-2',
            createdAt: new Date().toISOString(),
            title: 'Cardiac Health Research',
            description: 'Contribute to cardiovascular disease prevention research',
            price: '2000',
            currency: 'INR',
            participants: 89,
            creatorId: 'pharma-2',
            tags: ['CARDIAC', 'PREVENTION'],
            color: 'text-red-500',
            requirements: ['Age 40+', 'Family history of heart disease', 'Regular exercise routine'],
            steps: ['Initial health assessment', 'Wearable device monitoring', 'Quarterly reports'],
            reward: '₹ 2,000'
        },
        {
            id: 'study-3',
            createdAt: new Date().toISOString(),
            title: 'Mental Wellness Survey',
            description: 'Share your mental health journey to help others',
            price: '800',
            currency: 'INR',
            participants: 234,
            creatorId: 'pharma-3',
            tags: ['MENTAL HEALTH', 'WELLNESS'],
            color: 'text-blue-500',
            requirements: ['Age 18+', 'Willing to share mental health data', 'Regular app usage'],
            steps: ['Daily mood tracking', 'Weekly surveys', 'Anonymous data sharing'],
            reward: '₹ 800'
        }
    ];

    // Load enrolled studies from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('enrolledStudies');
        if (stored) {
            try {
                setEnrolledStudies(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load enrolled studies:', e);
            }
        }
    }, []);

    // Save enrolled studies to localStorage
    useEffect(() => {
        if (enrolledStudies.length > 0) {
            localStorage.setItem('enrolledStudies', JSON.stringify(enrolledStudies));
        }
    }, [enrolledStudies]);

    const handleEnrollClick = () => {
        setShowEnrollModal(true);
        setConsentChecked(false);
    };

    const handleConfirmEnrollment = () => {
        if (!consentChecked || !selectedStudy) return;

        setParticipationStatus('loading');
        setShowEnrollModal(false);

        // Simulate enrollment process
        setTimeout(() => {
            setParticipationStatus('success');
            setEnrolledStudies(prev => [...prev, selectedStudy.id]);
            setShowConfetti(true);

            // Hide confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000);

            // Reset status after 5 seconds
            setTimeout(() => setParticipationStatus('idle'), 5000);
        }, 2000);
    };

    const isEnrolled = (studyId: string) => enrolledStudies.includes(studyId);

    // Use backend data if available, otherwise use mock data
    const displayStudies = (marketplaceStudies && marketplaceStudies.length > 0)
        ? marketplaceStudies
        : (error || forceShowData)
            ? mockStudies
            : marketplaceStudies;

    if (isLoading && !forceShowData) {
        return <div className="p-20 text-center animate-pulse text-indigo-500 font-bold tracking-widest font-mono">LOADING MARKETPLACE DATALAYER...</div>
    }

    if (selectedStudy) {
        const enrolled = isEnrolled(selectedStudy.id);

        return (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Confetti Animation */}
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-green-500 rounded-full animate-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-10px',
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    animationDuration: `${2 + Math.random()}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Enrollment Modal */}
                {showEnrollModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full space-y-6 animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Enrollment Consent</h3>
                                    <p className="text-slate-400 text-sm">Please review and accept the terms to participate</p>
                                </div>
                                <button
                                    onClick={() => setShowEnrollModal(false)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 max-h-64 overflow-y-auto">
                                <h4 className="font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    Terms & Conditions
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>I consent to share my anonymized health data for this study</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>I understand my data will be encrypted and stored on IPFS</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>I can revoke consent at any time through my dashboard</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>I will receive {selectedStudy.reward} in NIROG tokens upon completion</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-green-500">✓</span>
                                        <span>All transactions are recorded on the blockchain for transparency</span>
                                    </li>
                                </ul>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={consentChecked}
                                    onChange={(e) => setConsentChecked(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-600 text-green-500 focus:ring-green-500 focus:ring-offset-slate-900 cursor-pointer"
                                />
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                    I have read and agree to the terms and conditions
                                </span>
                            </label>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setShowEnrollModal(false)}
                                    variant="outline"
                                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl h-12"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmEnrollment}
                                    disabled={!consentChecked}
                                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Enrollment
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <Button
                    variant="ghost"
                    onClick={() => setSelectedStudy(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"
                >
                    <Home className="w-4 h-4 rotate-180" /> Back to Marketplace
                </Button>

                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 relative overflow-hidden">
                    {/* Decorative Background Orb */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 space-y-10">
                        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div className="space-y-4">
                                <div className="flex gap-2 flex-wrap">
                                    {(selectedStudy.tags || []).map((t: string) => (
                                        <span key={t} className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-700">{t}</span>
                                    ))}
                                    {enrolled && (
                                        <span className="text-[10px] font-black bg-green-500/10 text-green-500 px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/20 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> ENROLLED
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-5xl font-black text-white tracking-tighter">{selectedStudy.title}</h2>
                                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">{selectedStudy.description}</p>
                            </div>
                            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center min-w-[200px]">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Reward</p>
                                <p className={`text-4xl font-black ${selectedStudy.color || 'text-green-500'}`}>{selectedStudy.reward}</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800/50 space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3"><ShieldAlert className="w-5 h-5 text-amber-500" /> Eligibility Criteria</h3>
                                <ul className="space-y-4">
                                    {(selectedStudy.requirements || []).map((req: string, i: number) => (
                                        <li key={i} className="flex items-center gap-4 text-slate-300">
                                            <div className="w-2 h-2 rounded-full bg-slate-700" />
                                            <span className="text-sm font-medium">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800/50 space-y-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-3"><Activity className="w-5 h-5 text-green-500" /> Participation Steps</h3>
                                <div className="space-y-4">
                                    {(selectedStudy.steps || []).map((step: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-green-500 group-hover:text-black transition-all">0{i + 1}</div>
                                            <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            {participationStatus === 'success' ? (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 text-center space-y-3 animate-in zoom-in-95 duration-500">
                                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                                    <h3 className="text-2xl font-bold text-green-500">Successfully Enrolled!</h3>
                                    <p className="text-slate-400">You're now participating in this study. Check your wallet for token rewards.</p>
                                </div>
                            ) : (
                                <Button
                                    className={`w-full ${enrolled ? 'bg-slate-700 cursor-not-allowed' : participationStatus === 'loading' ? 'bg-slate-800' : 'bg-green-600 hover:bg-green-500'} text-white font-black rounded-3xl h-16 text-xl shadow-[0_0_30px_rgba(22,163,74,0.15)] hover:scale-[1.01] transition-all relative overflow-hidden group`}
                                    onClick={handleEnrollClick}
                                    disabled={participationStatus === 'loading' || enrolled}
                                >
                                    {enrolled ? (
                                        <span className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5" />
                                            ALREADY ENROLLED
                                        </span>
                                    ) : participationStatus === 'loading' ? (
                                        <span className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            PROCESSING ENROLLMENT...
                                        </span>
                                    ) : (
                                        "ENROLL NOW"
                                    )}
                                </Button>
                            )}
                            <p className="text-center text-[10px] text-slate-600 font-mono mt-5 uppercase tracking-widest flex items-center justify-center gap-2">
                                <ShieldCheck className="w-3 h-3" /> Zero-Knowledge Data Lease Protocol Integrated
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes confetti {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                    .animate-confetti {
                        animation: confetti linear forwards;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><TrendingUp className="text-green-400" /> Data Marketplace</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {displayStudies.map((m: Study, i: number) => {
                    const enrolled = isEnrolled(m.id);
                    return (
                        <Card
                            key={i}
                            onClick={() => setSelectedStudy(m)}
                            className="bg-slate-900 border-zinc-800 p-8 rounded-[2.5rem] space-y-8 hover:border-green-500/30 transition-all cursor-pointer group hover:bg-slate-800/50 relative"
                        >
                            {enrolled && (
                                <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-wider">Enrolled</span>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {(m.tags || []).map((t: string) => <span key={t} className="text-[9px] font-bold px-3 py-1.5 bg-slate-950 rounded-lg text-slate-400 tracking-widest border border-slate-800">{t}</span>)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-xl leading-tight mb-4 group-hover:text-green-400 transition-colors uppercase tracking-tight">{m.title}</h4>
                                <p className="text-4xl font-black text-white">{m.reward}</p>
                            </div>
                            <Button
                                className={`w-full ${enrolled ? 'bg-slate-700 cursor-not-allowed' : 'bg-green-600/10 hover:bg-green-600'} ${enrolled ? 'text-slate-400' : 'text-green-500 hover:text-white'} border-green-600/20 font-bold rounded-2xl h-14 text-lg transition-all`}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    setSelectedStudy(m);
                                }}
                                disabled={enrolled}
                            >
                                {enrolled ? 'ENROLLED' : 'PARTICIPATE'}
                            </Button>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

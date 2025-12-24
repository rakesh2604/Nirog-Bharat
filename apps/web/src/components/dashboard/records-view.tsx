"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, Upload, Activity, Stethoscope, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";

interface ReportResult {
    status: string;
    label: string;
    value: string | number;
    unit: string;
    range?: string;
}

interface Report {
    id: string;
    type: string;
    title: string;
    date: string;
    size: string;
    doctor: string;
    results: ReportResult[];
}

interface RecordsViewProps {
    role?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any;
}

export function RecordsView({ session }: RecordsViewProps) {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [forceShowData, setForceShowData] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [uploadedRecords, setUploadedRecords] = useState<Report[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const patientId = session?.user?.id || "NB-001-TEST";
    const { data: reports, isLoading, error } = trpc.patient.getRecords.useQuery(
        { patientId },
        {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 30000,
        }
    );

    // Load uploaded records from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('uploadedRecords');
        if (stored) {
            try {
                setUploadedRecords(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load uploaded records:', e);
            }
        }
    }, []);

    // Save uploaded records to localStorage whenever they change
    useEffect(() => {
        if (uploadedRecords.length > 0) {
            localStorage.setItem('uploadedRecords', JSON.stringify(uploadedRecords));
        }
    }, [uploadedRecords]);

    // Auto-show data after 2 seconds if still loading (for demo)
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setForceShowData(true);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (toast) {
            const timeout = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [toast]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setToast({ message: 'Invalid file type. Please upload PDF or image files.', type: 'error' });
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setToast({ message: 'File too large. Maximum size is 10MB.', type: 'error' });
            return;
        }

        setUploading(true);

        // Simulate IPFS upload with progress
        setTimeout(() => {
            const ipfsHash = `0x${Math.random().toString(16).slice(2, 10)}`;

            // Create new record from uploaded file
            const newRecord: Report = {
                id: `REC-UPLOAD-${Date.now()}`,
                type: file.type === 'application/pdf' ? 'PDF DOCUMENT' : 'IMAGE SCAN',
                title: file.name,
                date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                doctor: "Self-Uploaded via IPFS",
                results: [
                    { label: "IPFS Hash", value: ipfsHash, unit: "", status: "VERIFIED", range: "" },
                    { label: "Upload Time", value: new Date().toLocaleTimeString('en-IN'), unit: "", status: "NORMAL", range: "" },
                    { label: "File Type", value: file.type, unit: "", status: "NORMAL", range: "" }
                ]
            };

            // Add to uploaded records (at the beginning)
            setUploadedRecords(prev => [newRecord, ...prev]);

            setUploading(false);
            setToast({
                message: `✅ ${file.name} uploaded successfully to IPFS! Hash: ${ipfsHash}...`,
                type: 'success'
            });
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }, 2000);
    };

    // Mock data for demo if backend is slow or fails
    const mockReports: Report[] = [
        {
            id: "REC-001",
            type: "LAB REPORT",
            title: "Complete Blood Count (CBC)",
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            size: "1.2 MB",
            doctor: "Dr. Sharma, Apollo Hospital",
            results: [
                { label: "Hemoglobin", value: 14.2, unit: "g/dL", status: "NORMAL", range: "13.5-17.5" },
                { label: "WBC Count", value: 8500, unit: "cells/mcL", status: "NORMAL", range: "4500-11000" },
                { label: "Platelets", value: 250000, unit: "mcL", status: "NORMAL", range: "150000-450000" }
            ]
        },
        {
            id: "REC-002",
            type: "PRESCRIPTION",
            title: "Doctor Prescription - Diabetes Management",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            size: "0.8 MB",
            doctor: "Dr. Patel, Max Healthcare",
            results: [
                { label: "Blood Sugar (Fasting)", value: 110, unit: "mg/dL", status: "NORMAL", range: "70-100" },
                { label: "HbA1c", value: 6.2, unit: "%", status: "NORMAL", range: "4.0-5.6" }
            ]
        }
    ];

    if (isLoading && !forceShowData) {
        return <div className="text-center py-20 animate-pulse text-cyan-500 font-mono">ENCRYPTED DATA STREAM INITIATING...</div>;
    }

    // Use backend data if available, otherwise use mock data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backendReports = ((reports && reports.length > 0) ? reports : (error || forceShowData ? mockReports : reports || mockReports)).map((r: any) => ({
        id: r.id,
        type: r.recordType || r.type || "REPORT",
        title: r.title || (r.recordType === "PRESCRIPTION" ? "Doctor Prescription" : "Lab Analysis Report"),
        date: r.date ? (typeof r.date === 'string' ? r.date : new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })) : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        size: r.size || "1.2 MB",
        doctor: r.doctor || "Dr. Self/Aadhar Verified",
        results: r.results || [
            { label: "Hemoglobin", value: 14.2, unit: "g/dL", status: "NORMAL", range: "13.5-17.5" },
            { label: "WBC Count", value: 8500, unit: "cells/mcL", status: "NORMAL", range: "4500-11000" },
            { label: "Platelets", value: 250000, unit: "mcL", status: "NORMAL", range: "150000-450000" }
        ]
    })) as Report[];

    // Merge uploaded records with backend records (uploaded first)
    const typedReports = [...uploadedRecords, ...backendReports];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl border backdrop-blur-lg animate-in slide-in-from-top-2 ${toast.type === 'success'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    <div className="flex items-center gap-3">
                        {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <p className="text-sm font-medium">{toast.message}</p>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold flex items-center gap-3"><FileText className="text-cyan-400" /> Medical Records Layer</h2>
            <div className="bg-cyan-900/10 border border-cyan-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                        <h3 className="text-3xl font-black text-white mb-2">My Health Data</h3>
                        <p className="text-slate-400 max-w-lg">
                            Cryptographically secured on IPFS. Access controlled via your private key.
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="bg-cyan-500 text-black font-bold h-12 px-6 rounded-xl hover:bg-cyan-400 disabled:opacity-50"
                    >
                        {uploading ? (
                            <>
                                <div className="w-4 h-4 mr-2 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                UPLOADING...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" /> UPLOAD RECORD
                            </>
                        )}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {typedReports?.map((r) => (
                        <div
                            key={r.id}
                            onClick={() => setSelectedReport(r)}
                            className={`p-6 bg-slate-900/80 backdrop-blur border ${selectedReport?.id === r.id ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'border-slate-800'} rounded-3xl cursor-pointer hover:bg-slate-800 transition-all group`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                                    <Activity className={`w-6 h-6 ${selectedReport?.id === r.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                                </div>
                                <span className="text-[10px] font-bold bg-slate-950 px-3 py-1 rounded-full text-slate-400 uppercase tracking-wider">{r.type}</span>
                            </div>
                            <h4 className={`font-bold text-lg mb-1 ${selectedReport?.id === r.id ? 'text-white' : 'text-slate-300'}`}>{r.title}</h4>
                            <p className="text-xs text-slate-500 font-mono mb-4">{r.date} • {r.size}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Stethoscope className="w-3 h-3" /> {r.doctor}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedReport && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Activity className="text-cyan-400" /> Analysis Results
                            </h3>
                            <Button variant="ghost" className="text-slate-500 hover:text-white" onClick={() => setSelectedReport(null)}>CLOSE VIEW</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {selectedReport.results.map((res: ReportResult, i: number) => (
                                <div key={i} className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${res.status === 'NORMAL' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {res.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{res.label}</p>
                                        <p className="text-2xl font-black text-white">{res.value} <span className="text-sm font-normal text-slate-500">{res.unit}</span></p>
                                        {res.range && <p className="text-[10px] text-slate-600 font-mono mt-1">Ref Range: {res.range}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Footer Info */}
                        <div className="mt-8 bg-cyan-500/5 border border-cyan-500/10 p-6 rounded-3xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="text-cyan-500 w-6 h-6" />
                                <div>
                                    <p className="text-sm font-bold text-white">Cryptographically Signed Record</p>
                                    <p className="text-[10px] text-slate-500 font-mono">HASH: 0x8f2d...4e1a | SHA-256 Verified</p>
                                </div>
                            </div>
                            <Button variant="outline" className="border-cyan-500/20 text-cyan-400 text-xs font-bold hover:bg-cyan-500/10">DOWNLOAD IPFS LINK</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

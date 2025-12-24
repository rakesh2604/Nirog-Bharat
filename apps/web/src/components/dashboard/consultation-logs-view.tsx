"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConsultationLog {
    name: string;
    id: string;
    date: string;
    type: string;
    status: string;
    notes: string;
}

export function ConsultationLogsView() {
    const [selectedLog, setSelectedLog] = useState<ConsultationLog | null>(null);

    const logs: ConsultationLog[] = [
        { name: "Rahul S.", id: "NB-PATIENT-142", date: "Today, 10:30 AM", type: "General Checkup", status: "Verified", notes: "Patient reported mild fever and fatigue. Prescribed paracetamol and rest. Vitals stable." },
        { name: "Priya V.", id: "NB-PATIENT-889", date: "Yesterday, 4:15 PM", type: "Cardio Consultation", status: "Verified", notes: "Follow-up for hypertension. BP 130/85. Advised salt reduction." },
        { name: "Amit K.", id: "NB-PATIENT-552", date: "Dec 20, 2:00 PM", type: "Dermatology", status: "Expired", notes: "Rash on forearm. Allergic reaction suspected." }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><History className="text-blue-400" /> Patient Histories</h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8">
                <div className="space-y-4">
                    {logs.map((log, i) => (
                        <div key={i} onClick={() => setSelectedLog(log)} className="flex justify-between items-center p-6 bg-slate-950/50 border border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-900 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 font-bold">{log.name[0]}</div>
                                <div>
                                    <p className="font-bold text-white">{log.name} ({log.id})</p>
                                    <p className="text-xs text-slate-500">{log.type} • {log.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${log.status === 'Verified' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{log.status}</span>
                                <Button variant="ghost" className="text-blue-400 text-xs font-bold">DETAILS</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simple Modal for Detail View */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLog(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full space-y-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedLog.name}</h3>
                                <p className="text-blue-400 font-mono text-sm">{selectedLog.id}</p>
                            </div>
                            <span className="bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold">{selectedLog.date}</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Consultation Type</p>
                            <p className="text-white text-lg">{selectedLog.type}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinical Notes</p>
                            <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">{selectedLog.notes}</p>
                        </div>
                        <Button onClick={() => setSelectedLog(null)} className="w-full bg-slate-800 hover:bg-slate-700 h-12 rounded-xl font-bold">CLOSE</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

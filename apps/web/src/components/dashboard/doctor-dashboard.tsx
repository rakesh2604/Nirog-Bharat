"use client";

import { useState } from "react";
import { Activity, FileText, ShieldCheck, CheckCircle, Calendar, Users, AlertTriangle, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "./metric-card";

interface LogItem {
    id: number;
    action: string;
    patient: string;
    time: string;
    hash: string;
    ip: string;
    status: string;
}

export function DoctorDashboard() {
    const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);

    const logs: LogItem[] = [
        { id: 1, action: "Record Viewed (Cardiac MRI)", patient: "NB-PATIENT-018", time: "14:01 PM", hash: "0x7f...3a21", ip: "192.168.1.101", status: "VERIFIED" },
        { id: 2, action: "Break-Glass Access (Trauma)", patient: "NB-PATIENT-028", time: "14:02 PM", hash: "0x9a...b2c4", ip: "192.168.1.101", status: "AUDITED" },
        { id: 3, action: "Prescription Update", patient: "NB-PATIENT-038", time: "14:03 PM", hash: "0x1d...e5f9", ip: "192.168.1.101", status: "VERIFIED" }
    ];

    const todayAppointments = [
        { id: 1, patient: "Rajesh Kumar", abhaId: "NB-PATIENT-018", time: "10:00 AM", reason: "Cardiac Checkup", status: "Completed" },
        { id: 2, patient: "Priya Sharma", abhaId: "NB-PATIENT-028", time: "11:30 AM", reason: "Diabetes Follow-up", status: "In Progress" },
        { id: 3, patient: "Amit Patel", abhaId: "NB-PATIENT-038", time: "2:00 PM", reason: "General Consultation", status: "Waiting" },
        { id: 4, patient: "Sneha Reddy", abhaId: "NB-PATIENT-048", time: "3:30 PM", reason: "Blood Pressure Check", status: "Scheduled" },
    ];

    const patientQueue = [
        { name: "Amit Patel", waitTime: "15 min", priority: "Normal" },
        { name: "Sneha Reddy", waitTime: "45 min", priority: "Normal" },
        { name: "Ravi Kumar", waitTime: "1h 10min", priority: "Low" },
    ];

    const emergencyAlerts = [
        { patient: "Emergency Patient #1", condition: "Cardiac Arrest", time: "5 min ago", severity: "Critical" },
    ];

    const recentConsultations = [
        { patient: "Rajesh Kumar", diagnosis: "Hypertension", date: "Today, 10:00 AM", followUp: "2 weeks" },
        { patient: "Meera Singh", diagnosis: "Type 2 Diabetes", date: "Yesterday", followUp: "1 month" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Emergency Alerts */}
            {emergencyAlerts.length > 0 && (
                <div className="bg-red-950/20 border-2 border-red-500 p-6 rounded-3xl animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <h3 className="text-lg font-bold text-red-400">EMERGENCY ALERTS</h3>
                    </div>
                    {emergencyAlerts.map((alert, index) => (
                        <div key={index} className="bg-red-950/40 p-4 rounded-2xl border border-red-500/30">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-white">{alert.patient}</p>
                                    <p className="text-sm text-red-400 mt-1">{alert.condition}</p>
                                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                                </div>
                                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                    {alert.severity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard title="Patients Today" value="14" subtitle="4 Waiting in queue" />
                <MetricCard title="Completed" value="10" subtitle="Consultations done" color="text-green-400" />
                <MetricCard title="Pending Reviews" value="3" subtitle="Records to review" color="text-yellow-400" />
                <MetricCard title="Access Logs" value="128" subtitle="Cryptographically verified" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient ZoomIn */}
                <Card className="bg-slate-900/50 border-blue-500/20 bg-blue-500/5 border-2 rounded-[2.5rem]">
                    <CardHeader><CardTitle className="text-blue-400 font-bold uppercase tracking-widest text-xs">Patient ZoomIn</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <input className="w-full bg-slate-900 border border-zinc-800 p-6 rounded-2xl text-white outline-none focus:border-blue-500 text-lg font-bold" placeholder="Enter ABHA ID..." />
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 rounded-2xl h-16 font-bold text-lg">REQUEST BIOMETRIC CONSENT</Button>
                    </CardContent>
                </Card>

                {/* Patient Queue */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                        Patient Queue ({patientQueue.length})
                    </h3>
                    <div className="space-y-3">
                        {patientQueue.map((patient, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{patient.name}</p>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" />
                                            Waiting: {patient.waitTime}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${patient.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                                        patient.priority === 'Normal' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-slate-500/10 text-slate-400'
                                    }`}>
                                    {patient.priority}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    Today's Appointments ({todayAppointments.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {todayAppointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="font-bold text-white">{apt.patient}</p>
                                    <p className="text-xs text-slate-500 font-mono mt-1">{apt.abhaId}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${apt.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                        apt.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                                            apt.status === 'Waiting' ? 'bg-yellow-500/10 text-yellow-400' :
                                                'bg-slate-500/10 text-slate-400'
                                    }`}>
                                    {apt.status}
                                </span>
                            </div>
                            <p className="text-sm text-white mb-2">{apt.reason}</p>
                            <p className="text-xs text-cyan-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {apt.time}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Consultations */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Recent Consultations
                </h3>
                <div className="space-y-3">
                    {recentConsultations.map((consult, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all">
                            <div>
                                <p className="font-bold text-white text-sm">{consult.patient}</p>
                                <p className="text-xs text-purple-400 mt-1">{consult.diagnosis}</p>
                                <p className="text-xs text-slate-500 mt-1">{consult.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500">Follow-up</p>
                                <p className="text-sm font-bold text-cyan-400">{consult.followUp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[3rem]">
                <h3 className="font-bold mb-8 flex items-center gap-3 text-2xl text-white"><Activity className="text-blue-400" /> Recent Activity</h3>
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex justify-between items-center p-6 bg-slate-950/40 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-blue-500/10 rounded-xl"><FileText size={22} className="text-blue-500" /></div>
                                <div><p className="font-bold text-white text-lg leading-none mb-1">{log.action}</p><p className="text-xs text-slate-500 font-mono">Patient: {log.patient} • {log.time}</p></div>
                            </div>
                            <Button onClick={() => setSelectedLog(log)} variant="ghost" className="text-blue-400 font-bold hover:bg-blue-500/10">VIEW LOG</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audit Log Modal */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLog(null)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full space-y-6 relative" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-0 right-0 p-6 opacity-20"><ShieldCheck size={100} /></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-white">Immutable Ledger Log</h3>
                                <p className="text-blue-400 font-mono text-xs mt-1">TRANSACTION HASH: {selectedLog.hash}</p>
                            </div>
                        </div>

                        <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-sm relative z-10">
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-500">TIMESTAMP</span>
                                <span className="text-white">{selectedLog.time}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-500">ACTION_TYPE</span>
                                <span className="text-white font-bold">{selectedLog.action}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-500">SUBJECT_ID</span>
                                <span className="text-cyan-400">{selectedLog.patient}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-500">ORIGIN_IP</span>
                                <span className="text-slate-400">{selectedLog.ip}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-slate-500">STATUS</span>
                                <span className="text-green-500 font-bold flex items-center gap-2"><CheckCircle size={14} /> {selectedLog.status}</span>
                            </div>
                        </div>

                        <Button onClick={() => setSelectedLog(null)} className="w-full bg-slate-800 hover:bg-slate-700 h-14 rounded-xl font-bold relative z-10">CLOSE AUDIT VIEW</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
    id: number;
    text: string;
    time: string;
    type: string;
    color: string;
    read: boolean;
    important: boolean;
}

interface NotificationsViewProps {
    role?: string;
}

export function NotificationsView({ role }: NotificationsViewProps) {
    const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Initialize notifications based on role
    useEffect(() => {
        const stored = localStorage.getItem(`notifications_${role || 'patient'}`);
        if (stored) {
            try {
                setNotifications(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load notifications:', e);
                setDefaultNotifications();
            }
        } else {
            setDefaultNotifications();
        }
    }, [role]);

    const setDefaultNotifications = () => {
        const patientNotifs: Notification[] = [
            { id: 1, text: "Dr. Aditi requested access to your 'Spine MRI Scan'", time: "2m ago", type: "ACCESS", color: "bg-red-500", read: false, important: true },
            { id: 2, text: "Your NIROG balance increased by ₹ 1,200", time: "1h ago", type: "REWARD", color: "bg-green-500", read: false, important: false },
            { id: 3, text: "New clinical trial available in your region: Pune", time: "4h ago", type: "TRIAL", color: "bg-blue-500", read: true, important: false },
            { id: 4, text: "Monthly Health Trend Report ready for download.", time: "1d ago", type: "SYSTEM", color: "bg-slate-500", read: true, important: false }
        ];

        const doctorNotifs: Notification[] = [
            { id: 1, text: "Patient 'Rahul S.' granted access to 'Cardiac Report'", time: "5m ago", type: "ACCESS", color: "bg-green-500", read: false, important: false },
            { id: 2, text: "Emergency Break-Glass protocol activated for ICU-2", time: "12m ago", type: "ALERT", color: "bg-red-500", read: false, important: true },
            { id: 3, text: "New consultation request from Dr. Mehta (Referral)", time: "1h ago", type: "REFERRAL", color: "bg-blue-500", read: true, important: false },
            { id: 4, text: "Verification successful for 3 new patient identities.", time: "4h ago", type: "SYSTEM", color: "bg-slate-500", read: true, important: false }
        ];

        const pharmaNotifs: Notification[] = [
            { id: 1, text: "Phase III Trial 'Diabetes-X' approved by Ethics Committee", time: "30m ago", type: "TRIAL", color: "bg-green-500", read: false, important: true },
            { id: 2, text: "Data Purchase of 1.2TB (De-identified) completed.", time: "3h ago", type: "DATA", color: "bg-purple-500", read: false, important: false },
            { id: 3, text: "New cohort match: 15,000 candidates found in Mumbai", time: "5h ago", type: "COHORT", color: "bg-blue-500", read: true, important: false },
            { id: 4, text: "NIROG Wallet top-up of ₹ 50L successful.", time: "1d ago", type: "FINANCE", color: "bg-yellow-500", read: true, important: false }
        ];

        const researcherNotifs: Notification[] = [
            { id: 1, text: "ZK-Query 'Cardio-Stats-2024' execution complete.", time: "10m ago", type: "QUERY", color: "bg-green-500", read: false, important: false },
            { id: 2, text: "Data Node 'Bangalore-East' is currently offline.", time: "45m ago", type: "SYSTEM", color: "bg-red-500", read: false, important: true },
            { id: 3, text: "New dataset available: 'Post-Covid Pulmonary Trends'", time: "2h ago", type: "DATA", color: "bg-blue-500", read: true, important: false },
            { id: 4, text: "Grant Application #8891 approved for peer review.", time: "1d ago", type: "GRANT", color: "bg-purple-500", read: true, important: false }
        ];

        const defaultNotifs =
            role === 'doctors' ? doctorNotifs :
                role === 'pharma' ? pharmaNotifs :
                    (role === 'researcher' || role === 'researchers') ? researcherNotifs :
                        patientNotifs;

        setNotifications(defaultNotifs);
    };

    // Save to localStorage whenever notifications change
    useEffect(() => {
        if (notifications.length > 0) {
            localStorage.setItem(`notifications_${role || 'patient'}`, JSON.stringify(notifications));
        }
    }, [notifications, role]);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const dismiss = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter === 'important') return n.important;
        return true;
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Bell className="text-yellow-400" />
                    Notification History
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </h2>
                <div className="flex gap-2">
                    {unreadCount > 0 && (
                        <Button
                            onClick={markAllAsRead}
                            variant="outline"
                            className="border-green-500/30 text-green-400 hover:bg-green-950 font-bold rounded-xl h-10 px-4 text-sm"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Mark All Read
                        </Button>
                    )}
                    {notifications.length > 0 && (
                        <Button
                            onClick={clearAll}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-950 font-bold rounded-xl h-10 px-4 text-sm"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === 'all'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                >
                    All ({notifications.length})
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${filter === 'unread'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                >
                    <Filter className="w-3 h-3" />
                    Unread ({unreadCount})
                </button>
                <button
                    onClick={() => setFilter('important')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${filter === 'important'
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                >
                    Important ({notifications.filter(n => n.important).length})
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-mono text-sm">
                        {filter === 'unread' ? 'No unread notifications' :
                            filter === 'important' ? 'No important notifications' :
                                'No notifications'}
                    </div>
                ) : (
                    filteredNotifications.map((n) => (
                        <div
                            key={n.id}
                            className={`p-6 bg-slate-900 border rounded-3xl flex justify-between items-center transition-all hover:border-yellow-500/30 group ${n.read ? 'border-slate-800 opacity-60' : 'border-slate-700'
                                } ${!n.read ? 'animate-in fade-in slide-in-from-right-4' : ''}`}
                        >
                            <div className="flex items-center gap-5 flex-1">
                                <div className={`w-3 h-3 rounded-full ${n.color} ${!n.read ? 'shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-pulse' : ''}`} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={`font-bold text-lg leading-none ${n.read ? 'text-slate-400' : 'text-slate-200'}`}>
                                            {n.text}
                                        </p>
                                        {n.important && (
                                            <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                                Important
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono">{n.type} • {n.time}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {!n.read && (
                                    <Button
                                        variant="ghost"
                                        className="text-green-400 font-bold hover:text-white hover:bg-green-950 rounded-xl h-9 px-4 text-sm"
                                        onClick={() => markAsRead(n.id)}
                                    >
                                        <Check className="w-4 h-4 mr-1" />
                                        Mark Read
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    className="text-slate-400 font-bold hover:text-white hover:bg-slate-800 rounded-xl h-9 px-4 text-sm"
                                    onClick={() => dismiss(n.id)}
                                >
                                    Dismiss
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

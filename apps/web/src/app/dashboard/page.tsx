"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, Suspense, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Wallet, History, TrendingUp, ShieldAlert, Activity, Home, LogOut, Settings,
    Bell, FileText, Building2, ZoomIn, Download, FlaskConical, Database, PieChart
} from "lucide-react";

import { SimpleToast } from "@/components/ui/simple-toast";
import { SidebarItem } from "@/components/dashboard/sidebar-item";

// Extracted views
import { PatientDashboard } from "@/components/dashboard/patient-dashboard";
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard";
import { PharmaDashboard } from "@/components/dashboard/pharma-dashboard";
import { ResearcherDashboard } from "@/components/dashboard/researcher-dashboard";
import { AccountView } from "@/components/dashboard/account-view";
import { NotificationsView } from "@/components/dashboard/notifications-view";
import { RecordsView } from "@/components/dashboard/records-view";
import { MarketplaceView } from "@/components/dashboard/marketplace-view";
import { ConsultationLogsView } from "@/components/dashboard/consultation-logs-view";
import { EmergencyQueueView } from "@/components/dashboard/emergency-queue-view";
import { PharmaROIView } from "@/components/dashboard/pharma-roi-view";
import { PharmaDataPurchaseView } from "@/components/dashboard/pharma-data-purchase-view";
import { ResearcherStatsView } from "@/components/dashboard/researcher-stats-view";
import { ResearcherExportView } from "@/components/dashboard/researcher-export-view";
import { WalletView } from "@/components/dashboard/wallet-view";
import { PatientZoomInView } from "@/components/dashboard/patient-zoom-in-view";
import { CampaignsView } from "@/components/dashboard/campaigns-view";
import { ZkQueriesView } from "@/components/dashboard/zk-queries-view";

export default function Dashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500 font-mono animate-pulse">BOOTING NIROG OS v2.4...</div>}>
            <DashboardContent />
        </Suspense>
    );
}

function DashboardContent() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();

    // State for the current role, initialized from session or query params
    const [role, setRole] = useState(() => {
        const queryRole = searchParams.get('role');
        if (queryRole) return queryRole.toLowerCase();
        return (session?.user?.role || "patient").toLowerCase();
    });

    // Update role if searchParams change
    const roleFromParams = searchParams.get("role");
    if (roleFromParams && roleFromParams.toLowerCase() !== role) {
        setRole(roleFromParams.toLowerCase());
    } else if (!roleFromParams && session?.user?.role && session.user.role.toLowerCase() !== role) {
        // If query param is removed, revert to session role
        setRole(session.user.role.toLowerCase());
    }


    const getDefaultTab = useCallback(() => {
        if (role === 'doctor' || role === 'doctors') return 'search';
        if (role === 'pharma') return 'campaigns';
        if (role === 'researcher' || role === 'researchers') return 'queries';
        return 'overview';
    }, [role]);

    const [activeTab, setActiveTab] = useState(getDefaultTab());
    const [toast, setToast] = useState<{ msg: string | null, type: 'success' | 'error' }>({ msg: null, type: 'success' });

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
    };

    // Update activeTab when role changes
    useEffect(() => {
        const defaultTab = getDefaultTab();
        setActiveTab(defaultTab);
    }, [role, getDefaultTab]);

    const renderContent = () => {
        switch (activeTab) {
            case "notifications": return <NotificationsView role={role} />;
            case "account": return <AccountView session={session} role={role} showToast={showToast} />;

            case "overview":
                if (role === 'doctor' || role === 'doctors') return <DoctorDashboard />;
                if (role === 'pharma') return <PharmaDashboard />;
                if (role === 'researcher' || role === 'researchers') return <ResearcherDashboard />;
                return <PatientDashboard session={session} />;

            case "records": return <RecordsView role={role} session={session} />;
            case "marketplace": return <MarketplaceView />;
            case "wallet": return <WalletView showToast={showToast} />;

            case "search": return <PatientZoomInView />;
            case "logs": return <ConsultationLogsView />;
            case "queue": return <EmergencyQueueView />;

            case "campaigns": return <CampaignsView showToast={showToast} />;
            case "purchase": return <PharmaDataPurchaseView showToast={showToast} />;
            case "roi": return <PharmaROIView />;

            case "queries": return <ZkQueriesView showToast={showToast} />;
            case "stats": return <ResearcherStatsView />;
            case "export": return <ResearcherExportView />;

            default: return <div className="text-slate-500 font-mono">Module not found. Please re-authenticate.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
            {toast.msg && <SimpleToast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: null, type: 'success' })} />}

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-20 lg:w-72 bg-slate-950/50 border-r border-slate-800/50 p-6 flex flex-col gap-10">
                    <div className="px-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]">NB</div>
                        <span className="hidden lg:block font-black text-xl text-white tracking-tighter">NIROG <span className="text-cyan-500">BHARAT</span></span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem icon={<Home size={22} />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} color="text-cyan-400" activeBg="bg-cyan-500/10" />

                        {(role === 'patient' || role === 'user') && (
                            <>
                                <SidebarItem icon={<FileText size={22} />} label="Medical Records" active={activeTab === "records"} onClick={() => setActiveTab("records")} color="text-cyan-400" activeBg="bg-cyan-500/10" />
                                <SidebarItem icon={<TrendingUp size={22} />} label="Marketplace" active={activeTab === "marketplace"} onClick={() => setActiveTab("marketplace")} color="text-green-400" activeBg="bg-green-500/10" />
                                <SidebarItem icon={<Wallet size={22} />} label="Health Wallet" active={activeTab === "wallet"} onClick={() => setActiveTab("wallet")} color="text-cyan-400" activeBg="bg-cyan-500/10" />
                            </>
                        )}

                        {(role === 'doctor' || role === 'doctors') && (
                            <>
                                <SidebarItem icon={<ZoomIn size={22} />} label="Patient ZoomIn" active={activeTab === "search"} onClick={() => setActiveTab("search")} color="text-blue-400" activeBg="bg-blue-500/10" />
                                <SidebarItem icon={<History size={22} />} label="Consultation Logs" active={activeTab === "logs"} onClick={() => setActiveTab("logs")} color="text-blue-400" activeBg="bg-blue-500/10" />
                                <SidebarItem icon={<ShieldAlert size={22} />} label="Break-Glass" active={activeTab === "queue"} onClick={() => setActiveTab("queue")} color="text-red-500" activeBg="bg-red-500/10" />
                            </>
                        )}

                        {role === 'pharma' && (
                            <>
                                <SidebarItem icon={<Building2 size={22} />} label="Campaigns" active={activeTab === "campaigns"} onClick={() => setActiveTab("campaigns")} color="text-indigo-400" activeBg="bg-indigo-500/10" />
                                <SidebarItem icon={<Database size={22} />} label="Data Purchase" active={activeTab === "purchase"} onClick={() => setActiveTab("purchase")} color="text-indigo-400" activeBg="bg-indigo-500/10" />
                                <SidebarItem icon={<PieChart size={22} />} label="ROI Analytics" active={activeTab === "roi"} onClick={() => setActiveTab("roi")} color="text-indigo-400" activeBg="bg-indigo-500/10" />
                            </>
                        )}

                        {(role === 'researcher' || role === 'researchers') && (
                            <>
                                <SidebarItem icon={<FlaskConical size={22} />} label="ZK Queries" active={activeTab === "queries"} onClick={() => setActiveTab("queries")} color="text-purple-400" activeBg="bg-purple-500/10" />
                                <SidebarItem icon={<Activity size={22} />} label="Network Stats" active={activeTab === "stats"} onClick={() => setActiveTab("stats")} color="text-purple-400" activeBg="bg-purple-500/10" />
                                <SidebarItem icon={<Download size={22} />} label="Data Export" active={activeTab === "export"} onClick={() => setActiveTab("export")} color="text-purple-400" activeBg="bg-purple-500/10" />
                            </>
                        )}
                    </nav>

                    <div className="pt-6 border-t border-slate-800/50 space-y-2">
                        <SidebarItem icon={<Bell size={22} />} label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
                        <SidebarItem icon={<Settings size={22} />} label="Account" active={activeTab === "account"} onClick={() => setActiveTab("account")} />
                        <SidebarItem
                            icon={<LogOut size={22} />}
                            label="Sign Out"
                            onClick={() => signOut({ callbackUrl: '/' })}
                            color="text-red-400"
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-slate-950/20">
                    <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-10 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-40">
                        <div>
                            <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                                {role} Node • {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-white">{session?.user?.name || "Dev User"}</p>
                                <p className="text-[10px] text-slate-500 font-mono">{session?.user?.id || "NB-001-TEST"}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white">
                                {session?.user?.name?.charAt(0) || "D"}
                            </div>
                        </div>
                    </header>

                    <div className="p-10 max-w-7xl mx-auto animate-in fade-in duration-300">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}

"use client";

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    color?: string;
    activeBg?: string;
}

export function SidebarItem({ icon, label, active = false, onClick, color = "text-slate-400", activeBg = "bg-slate-900" }: SidebarItemProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer group relative overflow-hidden ${active ? `${activeBg} ${color} font-semibold` : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
            {/* Ripple effect on click */}
            {active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>}

            <div className={`${active ? "scale-110" : "group-hover:scale-110 group-active:scale-95"} transition-transform duration-200 relative z-10`}>
                {icon}
            </div>
            <span className="hidden lg:block font-medium relative z-10">{label}</span>
        </div>
    );
}

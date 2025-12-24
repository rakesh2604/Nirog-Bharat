"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
}

export function MetricCard({ title, value, subtitle, color = "text-white" }: MetricCardProps) {
    return (
        <Card className="bg-slate-900/50 border-slate-800/80 border-2 text-white shadow-xl rounded-[2.5rem] p-4">
            <CardHeader><CardTitle className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</CardTitle></CardHeader>
            <CardContent>
                <div className={`text-4xl font-black ${color} tracking-tighter`}>{value}</div>
                {subtitle && <p className="text-[10px] mt-4 text-slate-400 font-bold uppercase tracking-tight opacity-70">{subtitle}</p>}
            </CardContent>
        </Card>
    );
}

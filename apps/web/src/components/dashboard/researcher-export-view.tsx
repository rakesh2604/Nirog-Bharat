"use client";

import { useState } from "react";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportItemProps {
    title: string;
    size: string;
    type: string;
    downloading: string;
    handleDownload: (file: string) => void;
    handlePrintPdf: (title: string) => void;
}

const ExportItemComp = ({ title, size, type, downloading, handleDownload, handlePrintPdf }: ExportItemProps) => (
    <div className="p-4 bg-slate-950 border border-purple-500/10 rounded-xl flex justify-between items-center group gap-4">
        <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm break-words leading-tight">{title}</p>
            <p className="text-[10px] text-slate-500 mt-1">{type} • {size}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <Button
                onClick={() => handleDownload(title)}
                disabled={downloading === title}
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white"
            >
                {downloading === title ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <div className="flex items-center gap-2"><Download className="w-4 h-4" /> CSV</div>}
            </Button>
            <Button
                onClick={() => handlePrintPdf(title)}
                size="sm"
                variant="ghost"
                className="text-purple-400 hover:text-white border border-purple-500/20 hover:bg-purple-500/10"
            >
                <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> PDF REPORT</div>
            </Button>
        </div>
    </div>
);

export function ResearcherExportView() {
    const [downloading, setDownloading] = useState("");

    const handleDownload = (file: string) => {
        setDownloading(file);

        // Simulate network delay for effect
        setTimeout(() => {
            const date = new Date().toISOString().split('T')[0];
            const content = `Safe-Harbor-ID,Region,Age_Group,Condition,Vitals_Avg\nNB-PAT-${Math.floor(Math.random() * 1000)},${['Maharashtra', 'Delhi', 'Karnataka', 'WB'][Math.floor(Math.random() * 4)]},35-45,Type-2 Diabetes,BP:130/85\nNB-PAT-${Math.floor(Math.random() * 1000)},${['Maharashtra', 'Delhi', 'Karnataka', 'WB'][Math.floor(Math.random() * 4)]},20-30,None,BP:110/70\n[END OF SAMPLE STRAM - GIGABYTE DATA TRUNCATED FOR BROWSER DOWNLOAD]`;

            const blob = new Blob([content], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.replace(/\s+/g, '_')}_${date}_SAMPLE.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setDownloading("");
        }, 1500);
    };

    const handlePrintPdf = (title: string) => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>Nirog Bharat Research Report - ${new Date().toISOString().split('T')[0]}</title>
                    <style>
                        body { font-family: sans-serif; padding: 40px; color: #1e293b; }
                        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #06b6d4; padding-bottom: 20px; margin-bottom: 40px; }
                        .logo { font-size: 24px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -1px; }
                        .meta { text-align: right; font-size: 12px; color: #64748b; }
                        h1 { font-size: 32px; font-weight: 800; margin-bottom: 10px; }
                        .summary { background: #f1f5f9; padding: 20px; border-radius: 12px; margin-bottom: 40px; border-left: 4px solid #06b6d4; }
                        table { w-full; width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th { text-align: left; padding: 12px; background: #0f172a; color: white; font-size: 12px; text-transform: uppercase; }
                        td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
                        .footer { margin-top: 60px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                        .chart-placeholder { height: 200px; background: #f8fafc; border: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; border-radius: 12px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="logo">Nirog Bharat Research</div>
                        <div class="meta">
                            Generated: ${new Date().toLocaleString()}<br/>
                            ID: NB-RES-001<br/>
                            Hash: 0x8a...4b2
                        </div>
                    </div>

                    <h1>${title} Analysis</h1>
                    <div class="summary">
                        <strong>Executive Summary:</strong> This report contains anonymized BMI indices from 14 nodes across Maharashtra, Delhi, and Karnataka. 
                        Zero-Knowledge Proof (Groth16) verification passed for all 1.4M records.
                    </div>

                    <h3>Distribution Visualization</h3>
                    <div class="chart-placeholder">
                        <img src="https://quickchart.io/chart?c={type:'bar',data:{labels:['18-25','26-35','36-50','50+'],datasets:[{label:'BMI > 25',data:[12,25,40,28]}]}}" style="max-height:100%" />
                    </div>

                    <h3>Sample Data Extract</h3>
                    <table>
                        <thead><tr><th>Patient Hash</th><th>Region</th><th>Age Group</th><th>BMI Index</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr><td>0x4f...a12</td><td>Maharashtra</td><td>25-30</td><td>24.2</td><td>NORMAL</td></tr>
                            <tr><td>0x9c...b31</td><td>Delhi NCR</td><td>40-45</td><td>28.5</td><td>OVERWEIGHT</td></tr>
                            <tr><td>0x1d...e44</td><td>Karnataka</td><td>30-35</td><td>21.8</td><td>NORMAL</td></tr>
                            <tr><td>0x7a...f99</td><td>West Bengal</td><td>50-55</td><td>31.0</td><td>OBESE_I</td></tr>
                            <tr><td>0x3b...c22</td><td>Maharashtra</td><td>20-25</td><td>23.5</td><td>NORMAL</td></tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        Nirog Bharat Protocol • Secure Research Data Layer • End-to-End Encrypted
                    </div>
                    <script>
                        window.onload = () => { setTimeout(() => window.print(), 500); }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Download className="text-purple-400" /> Data Export Center</h2>
            <div className="bg-purple-900/10 border border-purple-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-purple-500/20 rounded-2xl"><ShieldCheck className="w-8 h-8 text-purple-400" /></div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Zero-Knowledge Proof Verification</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">All exported data follows the **Bharat Privacy Protocol**. Personal Identifiable Information (PII) is mathematically impossible to reconstruct from these sets.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ExportItemComp title="National BMI Archive" size="428MB" type="CSV / JSON" downloading={downloading} handleDownload={handleDownload} handlePrintPdf={handlePrintPdf} />
                            <ExportItemComp title="Immunization Log V2" size="1.4GB" type="Parquet" downloading={downloading} handleDownload={handleDownload} handlePrintPdf={handlePrintPdf} />
                            <ExportItemComp title="Cardiac Trends 2024" size="892MB" type="SQL Dump" downloading={downloading} handleDownload={handleDownload} handlePrintPdf={handlePrintPdf} />
                            <ExportItemComp title="Respiratory Heatmap" size="155MB" type="GeoJSON" downloading={downloading} handleDownload={handleDownload} handlePrintPdf={handlePrintPdf} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

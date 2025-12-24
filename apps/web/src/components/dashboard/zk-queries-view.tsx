"use client";

import { useState } from "react";
import { ZoomIn, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";

interface ZkQueryResult {
    count: number;
    proofId: string;
    time: string;
    fee: string;
}

interface ZkVerifiedResult {
    verified: boolean;
    onChainTx: string;
}

interface ZkQueriesViewProps {
    showToast?: (msg: string, type?: 'success' | 'error') => void;
}

export function ZkQueriesView({ showToast }: ZkQueriesViewProps) {
    const [query, setQuery] = useState("SELECT count(*) FROM Population WHERE age > 60 AND city == 'Mumbai'");
    const [executing, setExecuting] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [result, setResult] = useState<ZkQueryResult | null>(null);
    const [verifiedResult, setVerifiedResult] = useState<ZkVerifiedResult | null>(null);

    const runMutation = trpc.researcher.runZkQuery.useMutation();
    const verifyMutation = trpc.researcher.verifyProof.useMutation();

    const handleExecute = () => {
        setExecuting(true);
        setResult(null);
        setVerifiedResult(null);

        // Simulate ZK-proof generation with realistic timing
        setTimeout(() => {
            const proofId = `zk-proof-${Math.random().toString(36).substring(2, 15)}`;
            const mockCount = Math.floor(Math.random() * 10000) + 5000; // Random count between 5000-15000

            setResult({
                count: mockCount,
                proofId: proofId,
                time: "1.5s",
                fee: "0.0002 ETH"
            });
            setExecuting(false);

            if (showToast) {
                showToast(`✅ ZK-Proof Generated! Proof ID: ${proofId.slice(0, 20)}...`);
            }
        }, 1500); // 1.5 second delay to simulate proof generation
    };

    const handleVerify = () => {
        if (!result) return;
        setVerifying(true);

        // Simulate on-chain verification
        setTimeout(() => {
            const txHash = `0x${Math.random().toString(16).slice(2, 66)}`;
            setVerifiedResult({
                verified: true,
                onChainTx: txHash
            });
            setVerifying(false);

            if (showToast) {
                showToast("✅ ZK-Proof Verified On-Chain!", "success");
            }
        }, 2000); // 2 second delay to simulate on-chain verification
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><ZoomIn className="text-purple-400" /> ZK-Query Portal</h2>
            <div className="bg-slate-900 border border-purple-500/20 bg-purple-500/5 p-10 rounded-[3rem]">
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-40 bg-slate-950 border border-slate-800 p-6 rounded-2xl text-purple-400 font-mono text-sm outline-none focus:border-purple-500 shadow-inner resize-none"
                />
                <Button
                    onClick={handleExecute}
                    disabled={executing || verifying}
                    className="mt-6 w-full bg-purple-600 hover:bg-purple-500 h-16 font-bold rounded-2xl text-lg shadow-xl shadow-purple-900/20"
                >
                    {executing ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> GENERATING SNARK PROOF...</> : "EXECUTE TRUSTLESS QUERY"}
                </Button>

                {result && (
                    <div className="mt-8 space-y-6 animate-in slide-in-from-top-4 duration-500">
                        <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${verifiedResult ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                                    {verifiedResult ? "Verified On-Chain" : "Awaiting Verification"}
                                </span>
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Result Aggregate</p>
                                    <p className="text-5xl font-black text-white leading-none whitespace-nowrap">{result.count.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Proof ID</p>
                                    <p className="text-xs font-mono text-purple-400">{result.proofId}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-900">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">Generation Time</p>
                                    <p className="text-sm font-bold text-white uppercase tracking-tighter">{result.time}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-black text-right">Settlement Fee</p>
                                    <p className="text-sm font-bold text-cyan-400 text-right uppercase tracking-tighter">{result.fee}</p>
                                </div>
                            </div>
                        </div>

                        {!verifiedResult ? (
                            <Button
                                onClick={handleVerify}
                                disabled={verifying}
                                className="w-full bg-slate-800 hover:bg-slate-700 h-14 font-bold rounded-2xl border border-slate-700 hover:border-purple-500/30 transition-all"
                            >
                                {verifying ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> RUNNING VERIFIER CIRCUIT...</> : "VERIFY PROOF ON-CHAIN"}
                            </Button>
                        ) : (
                            <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-xl text-green-400"><ShieldCheck className="w-6 h-6" /></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-green-400 uppercase tracking-widest">On-Chain Transaction</p>
                                    <p className="text-[10px] font-mono text-slate-500 truncate">{verifiedResult.onChainTx}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

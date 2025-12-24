"use client";

import { useState, useEffect } from "react";
import { Wallet, Activity, FileText, Loader2, X, ChevronDown, ChevronUp, ArrowDownToLine, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletViewProps {
    showToast: (msg: string) => void;
}

interface Transaction {
    id: string;
    type: 'earn' | 'withdraw';
    title: string;
    description: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending';
}

export function WalletView({ showToast }: WalletViewProps) {
    const [balance, setBalance] = useState(2450);
    const [redeeming, setRedeeming] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('500');
    const [bankDetails, setBankDetails] = useState({ accountNumber: '', ifsc: '', name: '' });
    const [showHistory, setShowHistory] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expandedTx, setExpandedTx] = useState<string | null>(null);

    // Load transactions from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('walletTransactions');
        if (stored) {
            try {
                setTransactions(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load transactions:', e);
                // Set default transactions if load fails
                setDefaultTransactions();
            }
        } else {
            setDefaultTransactions();
        }
    }, []);

    const setDefaultTransactions = () => {
        const defaultTxs: Transaction[] = [
            {
                id: 'tx-1',
                type: 'earn',
                title: 'Step Count Reward',
                description: 'Daily step goal achieved: 10,000 steps',
                amount: 50,
                date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
                status: 'completed'
            },
            {
                id: 'tx-2',
                type: 'earn',
                title: 'Data Share: Diabetes Study',
                description: 'Anonymized health data shared with research study',
                amount: 1200,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
                status: 'completed'
            }
        ];
        setTransactions(defaultTxs);
    };

    // Save transactions to localStorage
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem('walletTransactions', JSON.stringify(transactions));
        }
    }, [transactions]);

    const handleWithdraw = () => {
        if (!bankDetails.accountNumber || !bankDetails.ifsc || !bankDetails.name) {
            if (showToast) showToast("Please fill all bank details");
            return;
        }

        const amount = parseInt(withdrawAmount);
        if (amount > balance) {
            if (showToast) showToast("Insufficient balance");
            return;
        }

        setRedeeming(true);
        setShowWithdrawModal(false);

        setTimeout(() => {
            setBalance(b => b - amount);

            // Add withdrawal transaction
            const newTx: Transaction = {
                id: `tx-${Date.now()}`,
                type: 'withdraw',
                title: `Withdrawal to ${bankDetails.name}`,
                description: `Account: ****${bankDetails.accountNumber.slice(-4)} | IFSC: ${bankDetails.ifsc}`,
                amount: amount,
                date: new Date().toLocaleString('en-IN'),
                status: 'completed'
            };
            setTransactions(prev => [newTx, ...prev]);

            setRedeeming(false);
            if (showToast) showToast(`✅ Withdrawal Successful! ₹${amount} will be credited to your bank account within 24 hours.`);

            // Reset form
            setBankDetails({ accountNumber: '', ifsc: '', name: '' });
            setWithdrawAmount('500');
        }, 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Withdraw Tokens</h3>
                                <p className="text-slate-400 text-sm">Enter your bank details to withdraw</p>
                            </div>
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">Amount (₹)</label>
                                <input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    min="100"
                                    max={balance}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Enter amount"
                                />
                                <p className="text-xs text-slate-500 mt-1">Available: ₹{balance.toLocaleString()}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">Account Holder Name</label>
                                <input
                                    type="text"
                                    value={bankDetails.name}
                                    onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">Account Number</label>
                                <input
                                    type="text"
                                    value={bankDetails.accountNumber}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Enter account number"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-2 block">IFSC Code</label>
                                <input
                                    type="text"
                                    value={bankDetails.ifsc}
                                    onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value.toUpperCase() })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Enter IFSC code"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowWithdrawModal(false)}
                                variant="outline"
                                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl h-12"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleWithdraw}
                                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl h-12"
                            >
                                Confirm Withdrawal
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold flex items-center gap-3"><Wallet className="text-cyan-400" /> Health Wallet</h2>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet className="w-32 h-32" /></div>
                <div className="relative z-10 space-y-6">
                    <div>
                        <p className="text-cyan-400 font-bold tracking-widest text-xs uppercase mb-2">Total Balance</p>
                        <h3 className="text-5xl font-black text-white transition-all duration-500">₹ {balance.toLocaleString()}</h3>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => setShowWithdrawModal(true)}
                            disabled={redeeming || balance < 100}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl h-12 px-6 flex items-center gap-2"
                        >
                            {redeeming ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING...</>
                            ) : (
                                <><ArrowDownToLine className="w-4 h-4" /> WITHDRAW TOKENS</>
                            )}
                        </Button>
                        <Button
                            onClick={() => setShowHistory(!showHistory)}
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-950 font-bold rounded-xl h-12 px-6 flex items-center gap-2"
                        >
                            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            TRANSACTION HISTORY
                        </Button>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            {showHistory && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        Recent Transactions
                    </h3>
                    {transactions.length === 0 ? (
                        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center text-slate-400">
                            No transactions yet
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all hover:border-cyan-500/30">
                                    <div
                                        className="p-6 flex items-center justify-between cursor-pointer"
                                        onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                                }`}>
                                                {tx.type === 'earn' ? <TrendingUp className="w-5 h-5" /> : <ArrowDownToLine className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{tx.title}</p>
                                                <p className="text-xs text-slate-500">{tx.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold ${tx.type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.type === 'earn' ? '+' : '-'} ₹ {tx.amount.toLocaleString()}
                                            </span>
                                            {expandedTx === tx.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                        </div>
                                    </div>
                                    {expandedTx === tx.id && (
                                        <div className="px-6 pb-6 pt-2 border-t border-slate-800 animate-in slide-in-from-top-2 duration-200">
                                            <div className="bg-slate-950 rounded-2xl p-4 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Description:</span>
                                                    <span className="text-white">{tx.description}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Status:</span>
                                                    <span className="text-green-400 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> {tx.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Transaction ID:</span>
                                                    <span className="text-slate-300 font-mono text-xs">{tx.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Quick Stats */}
            {!showHistory && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {transactions.slice(0, 2).map((tx) => (
                        <div key={tx.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between hover:border-cyan-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                    }`}>
                                    {tx.type === 'earn' ? <Activity className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{tx.title}</p>
                                    <p className="text-xs text-slate-500">{tx.date.split(',')[0]}</p>
                                </div>
                            </div>
                            <span className="font-bold text-green-400">+ ₹ {tx.amount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

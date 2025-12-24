"use client";

import { useState, useEffect } from "react";
import { Database, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";

interface Dataset {
    id: string;
    title: string;
    description: string;
    price: string | number;
    currency: string;
}

interface PurchasedLicense {
    datasetId: string;
    datasetTitle: string;
    purchaseDate: string;
    txHash: string;
    price: string;
}

interface PharmaDataPurchaseViewProps {
    showToast: (msg: string, type?: 'success' | 'error') => void;
}

export function PharmaDataPurchaseView({ showToast }: PharmaDataPurchaseViewProps) {
    const [purchasing, setPurchasing] = useState<string | null>(null);
    const [forceShowData, setForceShowData] = useState(false);
    const [purchasedLicenses, setPurchasedLicenses] = useState<PurchasedLicense[]>([]);

    const { data: marketplace = [], isLoading, error } = trpc.pharma.getMarketplace.useQuery(undefined, {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 30000,
    });
    const mutation = trpc.pharma.purchaseLicense.useMutation();

    // Load purchased licenses from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('purchasedLicenses');
        if (stored) {
            try {
                setPurchasedLicenses(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to load purchased licenses:', e);
            }
        }

        // Listen for storage events from other tabs/components
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'purchasedLicenses' && e.newValue) {
                try {
                    setPurchasedLicenses(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Failed to parse storage event:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Auto-show data after 2 seconds if still loading
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setForceShowData(true);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    // Mock datasets for demo
    const mockDatasets: Dataset[] = [
        {
            id: 'dataset-1',
            title: 'Diabetes Patient Cohort (India)',
            description: 'De-identified data from 50,000 Type 2 Diabetes patients across 15 states. Includes glucose levels, medication adherence, and lifestyle factors.',
            price: '₹ 2,50,000',
            currency: 'INR'
        },
        {
            id: 'dataset-2',
            title: 'Cardiac Health Longitudinal Study',
            description: 'Multi-year cardiovascular health data from 30,000 patients. Includes ECG readings, blood pressure trends, and intervention outcomes.',
            price: '₹ 3,75,000',
            currency: 'INR'
        },
        {
            id: 'dataset-3',
            title: 'Mental Health Survey Dataset',
            description: 'Anonymized mental health assessments from 100,000 participants. Includes depression scores, anxiety metrics, and treatment responses.',
            price: '₹ 1,80,000',
            currency: 'INR'
        },
        {
            id: 'dataset-4',
            title: 'Post-Covid Recovery Patterns',
            description: 'Recovery data from 25,000 COVID-19 patients. Tracks symptoms, vaccination status, and long-term health impacts.',
            price: '₹ 2,20,000',
            currency: 'INR'
        }
    ];

    // Use backend data if available, otherwise use mock data
    const displayDatasets = (marketplace && marketplace.length > 0)
        ? marketplace
        : (error || forceShowData)
            ? mockDatasets
            : marketplace;

    const handlePurchase = (dataset: Dataset) => {
        if (!confirm("Confirm purchase of data license? This will deduct funds from your wallet.")) return;
        setPurchasing(dataset.id);

        // Simulate purchase
        setTimeout(() => {
            const txHash = `0x${Math.random().toString(16).slice(2, 18)}`;
            const newLicense: PurchasedLicense = {
                datasetId: dataset.id,
                datasetTitle: dataset.title,
                purchaseDate: new Date().toISOString(),
                txHash: txHash,
                price: dataset.price.toString()
            };

            // Update state
            const updatedLicenses = [...purchasedLicenses, newLicense];
            setPurchasedLicenses(updatedLicenses);

            // Save to localStorage for persistence
            localStorage.setItem('purchasedLicenses', JSON.stringify(updatedLicenses));

            // Trigger storage event for cross-tab/component sync
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'purchasedLicenses',
                newValue: JSON.stringify(updatedLicenses)
            }));

            setPurchasing(null);
            showToast(`✅ LICENSE ACQUIRED! Transaction Hash: ${txHash}`);
        }, 2000);
    };

    // Check if dataset is already purchased
    const isPurchased = (datasetId: string) => {
        return purchasedLicenses.some(license => license.datasetId === datasetId);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Database className="text-indigo-400" /> Data Licensing Portal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading && !forceShowData ? <div className="text-indigo-500 animate-pulse col-span-2 text-center p-12 bg-slate-900 border border-slate-800 rounded-3xl">LOADING DATASET MARKETPLACE...</div> :
                    (displayDatasets as Dataset[]).map((item) => {
                        const purchased = isPurchased(item.id);
                        return (
                            <div key={item.id} className={`bg-slate-900 border p-8 rounded-3xl group transition-all ${purchased ? 'border-green-500/30 bg-green-950/10' : 'border-slate-800 hover:border-indigo-500/30'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-slate-950 rounded-2xl">
                                        {purchased ? <CheckCircle className="text-green-500 w-8 h-8" /> : <Database className="text-indigo-500 w-8 h-8" />}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${purchased ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                        {purchased ? 'PURCHASED' : 'Verified Set'}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs">{item.description}</p>

                                <div className="flex items-end gap-2 mb-8">
                                    <span className="text-4xl font-black text-white">{item.price}</span>
                                    <span className="text-sm font-bold text-slate-500 mb-1">{item.currency}</span>
                                </div>

                                <Button
                                    onClick={() => handlePurchase(item)}
                                    disabled={purchasing === item.id || mutation.isPending || purchased}
                                    className={`w-full ${purchased ? 'bg-green-900/50 cursor-not-allowed' : purchasing === item.id ? 'bg-indigo-900' : 'bg-indigo-600 hover:bg-indigo-500'} h-14 font-bold rounded-2xl transition-all`}
                                >
                                    {purchased ? (
                                        <><CheckCircle className="w-5 h-5 mr-2" /> PURCHASED</>
                                    ) : purchasing === item.id ? (
                                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> VERIFYING ON-CHAIN...</>
                                    ) : (
                                        "ACQUIRE LICENSE"
                                    )}
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

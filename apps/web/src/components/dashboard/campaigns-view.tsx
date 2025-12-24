"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";

interface CampaignsViewProps {
    showToast?: (msg: string, type?: 'success' | 'error') => void;
}

export function CampaignsView({ showToast }: CampaignsViewProps) {
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("5000");
    const mutation = trpc.researcher.createStudy.useMutation();

    const handleCreate = () => {
        if (!title) {
            if (showToast) showToast("Please enter a study title", "error");
            return;
        }
        setCreating(true);
        mutation.mutate({
            title,
            description: `A new clinical research study for ${title}. Eligibility proofs required.`,
            price
        }, {
            onSuccess: () => {
                setCreating(false);
                setTitle("");
                if (showToast) showToast("Study Launched Successfully!", "success");
            },
            onError: (err) => {
                setCreating(false);
                if (showToast) showToast(`Launch Failed: ${err.message}`, 'error');
            }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Building2 className="text-indigo-400" /> Active Campaigns</h2>
            <div className="bg-indigo-900/10 border border-indigo-500/20 p-10 rounded-[3rem] space-y-6">
                <div className="text-center space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Launch New Study</h3>
                    <p className="text-slate-400 max-w-md mx-auto text-sm">Create clinical trial campaigns and list them in the Bharat Marketplace.</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Study Title (e.g. Hypertension Phase II)"
                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-indigo-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Price (NB)"
                            className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-indigo-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Button
                            onClick={handleCreate}
                            disabled={creating}
                            className="bg-indigo-600 hover:bg-indigo-500 h-14 px-8 rounded-xl font-bold transition-all"
                        >
                            {creating ? "LAUNCHING..." : "START"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

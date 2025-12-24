import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export function SimpleToast({ message, type = "success", onClose }: { message: string | null, type?: "success" | "error", onClose: () => void }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${type === 'success' ? 'bg-green-950/80 border-green-500/30 text-green-200' : 'bg-red-950/80 border-red-500/30 text-red-200'}`}>
                {type === 'success' ? <CheckCircle className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                <p className="font-medium pr-4">{message}</p>
                <button onClick={onClose} className="hover:opacity-70"><X size={18} /></button>
            </div>
        </div>
    );
}

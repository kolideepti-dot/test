import { useEffect } from "react";
import { useToast } from "./toastManager";
import "../css/ToastContainer.css"

const TYPE_STYLES = {
    info: { borderLeft: '4px solid #3b82f6', background: '#1e293b', color: '#fff' },
    success: { borderLeft: '4px solid #22c55e', background: '#1e293b', color: '#fff' },
    warning: { borderLeft: '4px solid #eab308', background: '#1e293b', color: '#fff' },
    error: { borderLeft: '4px solid #ef4444', background: '#1e293b', color: '#fff' },
}

export function ToastContainer() {   
    const { toast, removeToast } = useToast();
    console.log("toast", toast)

    return (
        <div className="toast-container">
            {toast.map((t) => (
                <ToastItem key={t.id} toast={t} onRemove={removeToast} />
            ))}
        </div>
    )
}

function ToastItem({toast, onRemove}){
    useEffect(() => {
        if (toast.duration > 0) {
            const timer = setTimeout(() => {
                onRemove(toast.id)
            }, toast.duration);

            return () => clearTimeout(timer)
        }
    }, [toast, onRemove]);

    return (
        <div className={`toast-item toast-${toast.type}`}>
            <p>{toast.message}</p>
            <button onClick={() => onRemove(toast.id)}>X</button>
        </div>
    )
}



    
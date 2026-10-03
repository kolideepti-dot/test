import { useState, useEffect } from "react";

class SmartTardingTaskManager extends EventTarget{
    constructor() {
        super();
        this.pendingAggrigates = new Map();
        this.throttleTime = 500;
    }

    agrigateToast(key, message, type='info') {
        if (this.pendingAggrigates.has(key)) {
            const current = this.pendingAggrigates.get(key);
            current.count += 1;
            current.message = `${message} ${current.count}`;
            clearTimeout(current.timer);

            current.timer = setTimeout(() => {
                this.emit(current);
                this.pendingAggrigates.delete(key)
            }, this.throttleTime)
        } else {
            const item = {
                id: Date.now() + Math.random(),
                type,
                key,
                message,
                duration: 4000,
                count: 1
            }
            item.timer = setTimeout(() => {
                this.emit(item);
                this.pendingAggrigates.delete(item);
            },this.throttleTime);

            this.pendingAggrigates.set(key, item)
        }
    }

    emit(item) {
        this.dispatchEvent(new CustomEvent('toast', {detail: item}))
    }
}
export const toastBus = new SmartTardingTaskManager();

export function useToast() {
    const [toast, setToast] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const newToast = e.detail;
            console.log("newToast", newToast)
            setToast((prev) => [newToast, ...prev].slice(0, 5));
            if(newToast.duration > 0) {
                setTimeout(() => {
                    removeToast(newToast.id)
                }, newToast.duration)
            }
        };

        const removeToast = (id) => {
            setToast((prev) => prev.filter(t => t.id !== id))
        }

        toastBus.addEventListener('toast', handleToast);
        return () => toastBus.removeEventListener('toast', handleToast);

    }, []);

    const removeToast = (id) => {
        setToast((prev) => prev.filter(t => t.id !== id))
    }

    console.log("toast...", toast)

    return { toast, removeToast };
}




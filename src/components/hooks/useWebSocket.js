// useWebSocket.js or your socket handler service
import { useEffect, useState } from 'react';

import { toastBus } from '../toastManager';
import { io } from "socket.io-client";            

export function useTradingWebSocket(url) {
    console.log("useTradingWebSocket called with url:", url);
    const [webSocketData, setWebSocketData] = useState(null)
    useEffect(() => {
        const socket = io(url, {
            withCredentials: true,
            transports: ["websocket", "polling"] // force both
        });
        socket.on("connect", () => {
            toastBus.agrigateToast(null ,'Connected to Live Trading Stream', 'success')
        });

        socket.on("disconnect", () => {
            toastBus.agrigateToast( null, 'Connection Lost. Reconnecting...', 'error')
        });

        socket.on("priceUpdate", (update) => {
            setWebSocketData(update);
            switch (update.type) {

                case 'PARTIAL_FILL':
                    toastBus.agrigateToast(`FILL_${update.symbol}`, `partial fill executed for ${update.symbol}`, 'info');
                    break;

                default:
                    break;
            }
        });

        socket.on("tradeConfirmation", (confirmation) => {
            toastBus.agrigateToast(`TRADE_${confirmation.symbol}`, `Trade confirmed for ${confirmation.symbol} with status: ${confirmation.status}`, 'success');
        });

        return () => socket.off("connect").off("disconnect").off("priceUpdate").off("tradeConfirmation");
    }, [url])
    return { webSocketData }; 
}

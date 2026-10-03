import React, { useState, useEffect } from "react";
const MarketPanel = () => {
    const [price, setPrice] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4000");
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrice(prev => [...prev.slice(-9), data])
        }
        return() => ws.close();

    }, [])

    return (
        <div>
            <h2>Live Market</h2>
            <ul>
                {price.map((p, i) => (
                    <li key={i}>
                        {p.symbol}: ${p.price} ({new Date(p.timestamp).toLocaleTimeString()});
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MarketPanel;
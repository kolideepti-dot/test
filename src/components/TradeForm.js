import React, { useState } from "react";
import axios from "axios";

function TradeForm() {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);

  const placeOrder = async (type) => {
    await axios.post("http://localhost:4000/api/trade", {
      symbol,
      quantity,
      type
    });
    alert(`${type} order placed!`);
  };

  return (
    <div>
      <h2>Place Trade</h2>
      <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={() => placeOrder("BUY")}>Buy</button>
      <button onClick={() => placeOrder("SELL")}>Sell</button>
    </div>
  );
}

export default TradeForm;

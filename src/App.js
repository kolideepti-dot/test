import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import TradeForm from "./components/TradeForm";
import Watchlist from "./components/Watchlist";

import MarketPanel from "./components/MarketPanel"
import Test from "./components/Test"
import { useTradingWebSocket } from "./components/hooks/useWebSocket"
import  { useAuth } from "./components/hooks/useAuth";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { user, logout } = useAuth();
  const [price, setPrice] = useState(null);
  const holdings = [
    { symbol: "AAPL", quantity: 10, avgprice: 120}
  ]

 const { webSocketData } = useTradingWebSocket("http://localhost:4000");
//  console.log("user", user )

  return (
   <div>
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/trade" element={<TradeForm />} />
        <Route path="/market" element={<MarketPanel />} />
        <Route path="/test" element={<Test />} />
        <Route path="/watchlist" element={<Watchlist logout={logout} />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;

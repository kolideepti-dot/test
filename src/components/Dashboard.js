import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "./ToastContainer";

function Dashboard({ price, user, logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <div>
      <Header user={user} />  
      <h2>Live Price</h2>
      <p>{price ? `$${price}` : "Loading..."}</p>
      <button onClick={handleLogout}>Logout</button>
    <ToastContainer />
    </div>
  );
}

export default Dashboard;

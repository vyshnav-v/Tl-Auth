import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css'
const Home = () => {
    const navigate = useNavigate();
      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };
  return (
    <div>
      <h1>Home</h1>
      <p>You are logged in.</p>
      {/* <button style={{backgroundColor:"red", }}>Log Out</button> */}
      <button class='button-78' role='button' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Home;

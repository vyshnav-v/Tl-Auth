import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import "./App.css";
import Home from "./Components/home/Home";
import LoginAndRegister from "./Components/LoginAndRegister/LoginAndRegister";
function App() {
  const token = localStorage.getItem("token");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginAndRegister />} />
        <Route path='/home' element={<Home />} />
        <Route path='/'  element={token ? <Navigate to="/home"/> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

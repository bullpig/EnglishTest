import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/Login';
import SignUp from './components/Register/Register';
import Home from './components/Home/Home';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import PopUp from "./components/Home/Popup/Popup";
import Result from "./components/Home/Result/Result";
import { useEffect, useState } from "react";
import SpinLoading from "./components/SpinLoading/SpinLoading";



function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={checkLogin()} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>



  )
}

function checkLogin() {
  return (
    localStorage.getItem("token") ? (
      <Navigate to="/home" />
    ) : (
      <SignIn />
    )
  );
}




export default App;

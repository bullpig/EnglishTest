import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/Login';
import SignUp from './components/Register/Register';
import Home from './components/Home';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={checkLogin()} />
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

function checkLogin() {
  return (
  localStorage.getItem("password")&&localStorage.getItem("username") ? (
    <Navigate to="/home" />
  ) : (
    <SignIn />
  )
  );
}

export default App;

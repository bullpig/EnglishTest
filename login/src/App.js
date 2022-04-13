import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from './components/Login/Login';
import SignUp from './components/Register/Register';
import Home from './components/Home/Home';
import './App.css';
import Result from "./components/Home/Result/Result";
import Quiz from "./components/Home/Quiz/Quiz";
import { useEffect, useState } from "react";

function App() {

  const navigate = useNavigate();

  const [checkToken, setCheckToken] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      setCheckToken(false);
      navigate("/")
    } else {
      setCheckToken(false);
      navigate("/home")
    }
  },[]);

  return (
    <div className="App">
      {checkToken ? null : (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      )}
    </div>
  )
}

export default App;

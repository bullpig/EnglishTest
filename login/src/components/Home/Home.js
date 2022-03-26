import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Main from './Main/Main';
import './Home.css';
import SpinLoading from '../SpinLoading/SpinLoading';
import PopUp from './Popup/Popup';


const theme = createTheme();

export default function Home() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [numberOfQuiz, setNumberOfQuiz] = useState(0)
  const [answerGrid, setAnswerGrid] = useState([])
  const [listAnswer, setListAnswer] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [finalScore, setFinalScore] = useState(0)


  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId").toString();
  const token = localStorage.getItem("token");

  var quizListLength = 0
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://english-backend-v2.herokuapp.com/games/getGame',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        examId: 24,
        userId: userId,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setData(res.data.data);
          setTotalPoint(res.data.totalPoint);
          localStorage.setItem('totalTime', res.data.totalTime);
          localStorage.setItem('totalPoint', res.data.totalPoint);
          setTotalTime(res.data.totalTime);

          quizListLength = res.data.data.length
          setNumberOfQuiz(quizListLength)
          var arr = []
          for (var i = 0; i < quizListLength; i++) {
            arr.push({ id: res.data.data[i].id, isAnswer: false })
          }
          setAnswerGrid(arr)
          setLoading(false);
        }
      });
  }, []);

  function closePopup() {
    setIsOpen(false)
  }

  function finalSubmit() {
    setLoading(true)
    axios.post('https://english-backend-v2.herokuapp.com/games/finishGame',
        {
            examId: 24,
            listAnswer: listAnswer,
            totalTime: 30,
            userId: userId
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        console.log(listAnswer)
        console.log(res.data)
        setFinalScore(res.data.scores)
        console.log(finalScore);
        localStorage.setItem('scores', res.data.scores)
        console.log(finalScore)
        setLoading(false)
        navigate('/result')
      })
      .catch(error => {
          console.log("Error")
      })
}




  return (
    <div>
      {loading ? <SpinLoading /> :
        <div className='home'>
          <div style={{display: isOpen? 'block':'none'}}>
              <PopUp closePopup={closePopup} finalSubmit={finalSubmit} />
          </div>
          <Header />
          <Main 
            data={data}
            totalPoint = {totalPoint}
            totalTime = {totalTime}
            numberOfQuiz = {numberOfQuiz}
            answerGridBtn = {answerGrid}
            listAnswer = {listAnswer}
            setListAnswer = {setListAnswer}
            isOpen = {isOpen}
            setIsOpen = {setIsOpen}
            finalSubmit = {finalSubmit}
          />
        </div>
      }
    </div>
  );
}
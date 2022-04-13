import "bootstrap/dist/css/bootstrap.min.css";
import './Quiz.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SpinLoading from "../../SpinLoading/SpinLoading";
import { faArrowLeft, faArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopUp from "../Popup/Popup";
import Question from "../Question/Question";


export default function Quiz() {

    const navigate = useNavigate();
    const params = useParams();
    const lessonId = params.lessonId;
    const [completedQuiz, setCompletedQuiz] = useState(0);
    const [data, setData] = useState([]);
    const [numberOfQuiz, setNumberOfQuiz] = useState(0);
    const [answerGridBtn, setAnswerGridBtn] = useState([]);
    const [listAnswer, setListAnswer] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");

    const [totalTime, setTotalTime] = useState(0);
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);

    //Get game
    useEffect(() => {
        var quizListLength = 0;
        setLoading(true)
        axios({
            method: 'post',
            url: 'https://english-backend-v2.herokuapp.com/games/getGame',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
            data: {
                examId: lessonId,
                userId: userId,
            },
        })
        .then((res) => {
            if (res.status === 200) {
                setData(res.data.data);
                // setTotalPoint(res.data.totalPoint);
                localStorage.setItem('totalPoint', res.data.totalPoint);
                setTotalTime(res.data.totalTime);
                setMinutes(res.data.totalTime);
                quizListLength = res.data.data.length
                setNumberOfQuiz(res.data.data.length)
                var arr = []
                for (var i = 0; i < quizListLength; i++) {
                    arr.push({ id: res.data.data[i].id, isAnswer: false })
                }
                setAnswerGridBtn(arr)
            }
        })
        .finally(() => {
            setLoading(false);
        })
    },[lessonId,token,userId])

    function togglePopup() {
        setIsOpen(true)
    }

    function closePopup() {
        setIsOpen(false)
    }

    // CountDown
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    finalSubmit();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    //Submit Exam
    function finalSubmit() {
        var timeToDo = (totalTime - minutes - 1) * 60 + (60 - seconds);
        setLoading(true)
        setIsOpen(false)
        axios.post('https://english-backend-v2.herokuapp.com/games/finishGame',
            {
                examId: lessonId,
                listAnswer: listAnswer,
                totalTime: timeToDo,
                userId: userId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(res => {
                // setFinalScore(res.data.scores)
                localStorage.setItem('scores', res.data.scores)
                navigate('/result');
            })
            .then(res => {
                setLoading(false)
            })
            .catch(error => {
                console.log("Error")
            })
    }

    const handleBack = (event) => {
        navigate('/home')
    }

    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToQuestion = (id) => {
        const target = document.getElementById(id).getBoundingClientRect().top - 50;
        // console.log(target);
        window.scrollTo({ top: target, behavior: "smooth" });
    };

    return (
        <div className="quiz-page">
            <div className="header">
                <div className="container">
                    <div className="right" >
                        <div className="icon-user">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <span className="fullname">
                            {fullname}
                        </span>
                        <div className="">
                            <button className="btn-logout" onClick={handleBack}>
                                Back
                                {/* <FontAwesomeIcon icon={faArrowRightFromBracket}  /> */}
                                <FontAwesomeIcon icon={faArrowLeft} style={{ paddingLeft: '10px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-to-top">
                {showTopBtn && (
                    <FontAwesomeIcon className="scroll-to-top-btn" onClick={goToTop} icon={faArrowUp} style={{display: showTopBtn ? 'inline' : 'none'}}/>
                )}
            </div>
            <div style={{display: isOpen? 'block':'none'}}>
              <PopUp closePopup={closePopup} finalSubmit={finalSubmit} />
            </div>
            {loading ? <SpinLoading/> :
            <div className="main">
                <div className="background">
                    <img src="../../../../background.jpg" alt="Background"></img>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 left-main">
                            <div className="container">
                                {/* CLOCK */}
                                <div className="row time">
                                    <div className="col-12 clock-img">
                                        <img src="../../../../clock.png" alt="Clock"></img>
                                        <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
                                        <p>Completed: {completedQuiz}/{numberOfQuiz}</p>
                                    </div>
                                </div>
                                <div className="row number-container" >
                                    {answerGridBtn.map(function (item, index) {
                                        return (
                                            <div
                                                key={index}
                                                className="question-number quiz-item col-3"
                                                style={item.isAnswer ? { background: 'black', color: 'white' } : { background: 'white', color: 'black' }}
                                                onClick={() => {
                                                    scrollToQuestion(item.id);
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className="button" onClick={togglePopup}>
                                    <button className="button-5" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 right-main" >
                            {data.map((question, index) => {
                                return (
                                    <div key={question.id}>
                                        <Question
                                            id={question.id}
                                            index={index}
                                            questionTitle={question.questionTitle}
                                            questionContent={question.questionContent}
                                            listAnswer={listAnswer}
                                            setListAnswer={setListAnswer}
                                            completedQuiz={completedQuiz}
                                            setCompletedQuiz={setCompletedQuiz}
                                            answerGridBtn={answerGridBtn}
                                            setAnswerGridBtn={setAnswerGridBtn}
                                        />
                                    </div>
                                )
                            })}
                            <div className="button" onClick={togglePopup}>
                                <button className="button-5" type="submit">Submit</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>}
        </div>

    )
}
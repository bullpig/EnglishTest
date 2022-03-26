import "bootstrap/dist/css/bootstrap.min.css";
import './Main.css';
import { useState, useEffect } from 'react';
import Question from './Question';
import Clock from "../Clock/Clock";


export default function Main(props) {

    const data = props.data;
    const numberOfQuiz = props.numberOfQuiz;
    const {listAnswer, setListAnswer} = props
    const [completedQuiz, setCompletedQuiz] = useState(0)
    const [answerGridBtn, setAnswerGridBtn] = useState(props.answerGridBtn)
    const {setIsOpen} = props
    const {finalSubmit} = props

    function togglePopup() {
        setIsOpen(true)
    }
    
    return (
        <div className = "main">
            
            <div className = "background">
                <img src = "./background.jpg"></img>
            </div>
            <div className = "container">
                <div className = "row">
                    <div className = "col-3 left-main">
                        <div className = "container">
                        
                            {/* CLOCK */}
                            <div className = "row time">
                                <div className = "col-12 clock-img">
                                    <img src = "./clock.png"></img>
                                    <Clock finalSubmit={finalSubmit}/>
                                    <p>Completed: {completedQuiz}/{numberOfQuiz}</p>
                                </div>
                                
                            </div>
                        

                            <div className = "row number-container">

                                {answerGridBtn.map(function (item) {
                                    var linkId = '#ques-'
                                    if (item.id == 1) {
                                        linkId = '#ques-1'
                                    } else {
                                        linkId += item.id-1
                                    }
                                    return (
                                        <div className='quiz-item col-3 question-number' id={item.id} key={item.id} style={item.isAnswer ? { background: 'black' } : { background: 'white' }}>
                                            <a href={linkId} style={item.isAnswer ? { color: 'white' } : { color: 'black' }}>
                                                {item.id}
                                            </a>
                                        </div>
                                    )
                                })

                                }
                            </div>
                            
                            <div className="button" onClick={togglePopup}>
                                <button className="button-5" role="button" type="submit">Submit</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-9 right-main">
                        
                        {data.map((question) => {
                            return (
                                <div id={`ques-${question.id}`}>
                                    <Question
                                        id={question.id}
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
                            <button className="button-5" role="button" type="submit">Submit</button>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}
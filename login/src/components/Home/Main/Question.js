import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./Question.css"

export default function Question(props) {

    var question = props.questionContent
    var answer = question.split('|');

    const {answerGridBtn, setAnswerGridBtn} = props
    const {listAnswer, setListAnswer} = props
    const {completedQuiz, setCompletedQuiz} = props
    // console.log(answerGridBtn);



    const handleChange = (e) =>{
        var target = e.target
        // console.log(props.listAnswer)
        const answerId = props.listAnswer.findIndex(arr => {return arr.id == target.name})

        if(answerId < 0) {
            setCompletedQuiz(completedQuiz + 1)
            setListAnswer([
                ...listAnswer,
                {id: parseInt(target.name), questionAnswer: target.value}
            ])

            const newAnswerList = [...answerGridBtn]
            newAnswerList[target.name - 1] = {
                id: target.name,
                isAnswer: true
            }
            setAnswerGridBtn(newAnswerList)
        } else {
            const newListAnswer = [...listAnswer]
            newListAnswer[answerId] = {
                id: parseInt(target.name),
                questionAnswer: target.value
            }
            setListAnswer(newListAnswer)
        }
        // console.log(listAnswer)
    }

    return (
        <div >
            <div className="container-fluid">
                <div className="row">           
                    <div className="question"> 
                        <p>{props.id}. {props.questionTitle}</p>
                    </div>
                    <div className="col-6 answer">
                        <input type="radio" id={props.id + answer[0]} name={props.id} value={answer[0]} onChange={handleChange}></input>
                        <label for={props.id + answer[0]}>A. {answer[0]}</label>
                    </div>
                    <div className="col-6 answer">
                        <input type="radio" id={props.id + answer[1]} name={props.id} value={answer[1]} onChange={handleChange}></input>
                        <label for={props.id + answer[1]}>B. {answer[1]}</label>
                    </div>
                    <div className="col-6 answer">
                        <input type="radio" id={props.id + answer[2]} name={props.id} value={answer[2]} onChange={handleChange}></input>
                        <label for={props.id + answer[2]}>C. {answer[2]}</label>
                    </div>
                    <div className="col-6 answer">
                        <input type="radio" id={props.id + answer[3]} name={props.id} value={answer[3]} onChange={handleChange}></input>
                        <label for={props.id + answer[3]}>D. {answer[3]}</label>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
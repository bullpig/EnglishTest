import "./Lesson.css";

export default function Lesson(props){
    const {lessonId ,examName, totalPoint, totalTime ,handleStartLesson } = props
    return(
        <div className="lesson-container">
            <div className="lesson-name">{examName}</div>
            <p className="lesson-point">Total point: <span>{totalPoint}</span> </p>
            <p className="lesson-time">Total time: <span>{totalTime}</span> </p>
            <button className="start-lesson" onClick={() =>{handleStartLesson(lessonId);}}>Start</button>
            <div className="tag-lesson">{totalPoint}</div>
        </div>
    )
}
import "./Result.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";


export default function Result(props){
    const scores = localStorage.getItem('scores');
    const totalPoint = localStorage.getItem('totalPoint')
    return(
        <div className="result">
            <div>
                <FontAwesomeIcon icon={faFaceSmile}  style={{color: 'red', fontSize:'50px'}}/>
            </div>
            <h1>Your score: {scores}/{totalPoint}</h1>
        </div>
    )
}
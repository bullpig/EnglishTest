import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFaceSmile, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result(props){
    const navigate = useNavigate();
    const scores = localStorage.getItem('scores');
    const totalPoint = localStorage.getItem('totalPoint');
    const fullname = localStorage.getItem("fullname");

    

    const handleBack = (event) => {
        navigate('/home')
    }
    return(
        <div className="score-container">
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
                                <FontAwesomeIcon icon={faArrowLeft} style={{ paddingLeft: '10px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="result-score">
                <FontAwesomeIcon icon={faFaceSmile}  style={{color: 'red', fontSize:'50px'}}/>
                <h1>Your score: {scores}/{totalPoint}</h1>
            </div>
        </div>
    )
}
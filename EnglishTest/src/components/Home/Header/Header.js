import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser, } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const navigate = useNavigate();
    const fullname = localStorage.getItem("fullname");

    const handleLogout = (event) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('totalTime');
        localStorage.removeItem('totalPoint');
        navigate('/')
    };

    return (
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
                        <button className="btn-logout" onClick={handleLogout}>
                            Log out
                            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ paddingLeft: '10px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
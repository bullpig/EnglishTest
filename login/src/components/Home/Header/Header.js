import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"
import { Navigate, useNavigate } from "react-router-dom";


function Header() {
    const userId = localStorage.getItem("userId").toString();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('totalTime');
        localStorage.removeItem('totalPoint');

        console.log('logout');
        navigate('/login')
    };

    return (
        <div className="header">
            <div className="container">
                <div className="right" >
                    <span className="userId">
                        Your ID: {userId}
                    </span>
                    <div className="">
                        <button className="btn-logout" onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
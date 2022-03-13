import LoadingSpin from "react-loading-spin";
import './SpinLoading.css'

export default function SpinLoading() {
    return (
        <div className="loader-container">
            <div className="loader">
                <LoadingSpin className="spinner"></LoadingSpin>
            </div>
        </div>
    )
}
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Popup.css'

export default function PopUp (props) {
    return (
        <div className='modal-container'>
            <div className="modal">
                <button id='close-btn' onClick={props.closePopup} >
                    <FontAwesomeIcon icon={faXmark} />
                </button> 
                <i id='warning-icon'>
                    <FontAwesomeIcon icon={faCircleExclamation} style={{color:'#fa6400'}} />
                </i>
                <p className="message">Are you sure finish ?</p>
                <div className="options">
                    <button onClick={props.finalSubmit} className="btn btn-yes">Yes!</button>
                    <button onClick={props.closePopup} className="btn btn-cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}
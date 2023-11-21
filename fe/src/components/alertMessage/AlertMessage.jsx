import React from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import "./alertMessage.css"



function AlertMessage({ message }) {
    return (
        <div className="alert-container">
            <div className='alert-color alert-message'> <CheckCircleFill className='me-2' size={40} />{message}</div>
        </div>
    );
}

export default AlertMessage;
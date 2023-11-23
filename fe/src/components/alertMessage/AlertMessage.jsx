// import React from 'react';
// import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
// import "./alertMessage.css"



// function AlertMessage({ message }) {
//     return (
//         <div className="alert-container">
//             <div className='alert-color alert-message'> <CheckCircleFill className='me-2' size={40} />{message}</div>
//         </div>
//     );
// }

// export default AlertMessage;


import React from 'react';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import "./alertMessage.css";

function AlertMessage({ message, success }) {
    const IconComponent = success ? CheckCircleFill : XCircleFill;
    const alertColorClass = success ? 'success' : 'error';

    return (
        <div className={`alert-container ${alertColorClass}`}>
            <div className='alert-message'>
                <IconComponent className='me-2' size={40} />
                {message}
            </div>
        </div>
    );
}

export default AlertMessage;

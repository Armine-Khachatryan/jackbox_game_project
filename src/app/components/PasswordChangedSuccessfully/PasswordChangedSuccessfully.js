import React from "react";
import Modal from 'react-modal';
import classes from './PasswordChangedSuccessfully.module.css';



function PasswordChangedSuccessfully (props){

    const customStyles = {
        content: {
            padding: '64px 100px',
            maxWidth: '600px',
            width: '100%',
            height:'220px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return(
        <>
            <Modal
                isOpen={props.passwordChangedModalIsOpen}
                onRequestClose={props.closePasswordChangedModal}
                // onAfterOpen={props.closeChangePasswordModal}
                style={customStyles}
                ariaHideApp={false}
            >
             <div className={classes.passChangedWhole}>Password has changed successfully!!!</div>
            </Modal>
        </>
    )
}

export default PasswordChangedSuccessfully;
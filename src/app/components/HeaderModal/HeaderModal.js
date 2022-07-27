import React from "react";
import Modal from 'react-modal';
import classes from './HeaderModal.module.css';



function HeaderModal (props){

    const customStyles = {
        content: {
            padding: '24px 16px',
            maxWidth: '285px',
            width: '100%',
            height:'170px',
            top: '16%',
            left: '82%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return(
        <>
            <Modal
                isOpen={props.headerModalIsOpen}
                onRequestClose={props.closeHeaderModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.modalDiv}>Close the game</div>
                <div className={classes.modalDiv}>Close the game and sign out</div>
                <div className={classes.modalDiv}>Close the game and go to profile</div>
            </Modal>
        </>
    )
}


export default HeaderModal;
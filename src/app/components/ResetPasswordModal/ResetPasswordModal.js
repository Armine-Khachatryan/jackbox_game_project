import React from "react";
import Modal from 'react-modal';
import classes from './ResetPasswordModal.module.css';
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import WhiteBigButton from "../../UI/WhiteBigButton/WhiteBigButton";
import useValidate from "../../hooks/useValidate";
import useInput from "../../hooks/useInput";
import {useNavigate} from "react-router-dom";
import Input from "../../UI/Inputs/Input";
import axios from "axios";
import config from "../../config";


function ResetPasswordModal (props){
    const navigate = useNavigate();
    const customStyles = {
        content: {
            padding: '64px 121px',
            maxWidth: '730px',
            width: '100%',
            height:'470px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeAndResetForgotPasswordModal(){
        props.closeForgotPasswordModal ();
        resetEmail()
    }

    const {isEmail}=useValidate();

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);


    let emailMessage =null;
    if(!email){
        emailMessage = "Email is required";
    }
    else if (!emailIsValid){
        emailMessage = "Invalid email";
    }

    const values={
        email:email,
        redirect_url:"http://localhost:3000/"
    }

    console.log(values)



    // let postResetPasswordEmailRequest = async (values) => {
    //     try {
    //         let response = await axios.post(`${config.baseUrl}auth/request-reset-email/`, values)
    //         console.log(response, 'resetPasswordEmailRequest response');
    //         // dispatch({
    //         //         type: "",
    //         //         payload: response.data
    //         //     })
    //         navigate("/resetPasswordMessagePage");
    //     } catch (e) {
    //         console.log(e);
    //         console.log(e.response, 'resetPassEmailRequestError');
    //     }
    // }


    return(
        <>
            <Modal
                isOpen={props.forgotPassModalIsOpen}
                onRequestClose={closeAndResetForgotPasswordModal}
                // onAfterOpen={props.closeSignUpModal}
                style={customStyles}
                ariaHideApp={false}
                //contentLabel="Login"
            >
                <div className={classes.resetPasswordDiv}>Reset Password</div>
                <Input
                    hasError = {emailHasError}
                    errorText={emailMessage}
                    input={{
                        value: email,
                        placeholder: "Email",
                        type: "email",
                        onChange: emailChangeHandler,
                        onBlur: emailBlurHandler
                    }}
                />
                <div className={classes.btnDiv}>
                    <PurpleBigButton
                        // OnClick={postResetPasswordEmailRequest()}
                    >Sent Resent Link</PurpleBigButton>
                </div>
                <WhiteBigButton>Cancel</WhiteBigButton>
            </Modal>
        </>
    )
}


export default ResetPasswordModal;


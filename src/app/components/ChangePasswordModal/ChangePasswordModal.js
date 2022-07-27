import React from "react";
import Modal from 'react-modal';
import classes from './ChangePasswordModal.module.css';
import Input from "../../UI/Inputs/Input";
import useInput from "../../hooks/useInput";
import useValidate from "../../hooks/useValidate";
import EyeImg from "../../assets/images/EyeImg.png";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import axios from "axios";
import config from "../../config";
import {useSelector} from "react-redux";


function ChangePasswordModal (props){
    let user = useSelector(store => store.user);
    let id = user.id;
    const {isPassword}=useValidate()

    const {
        value: currentPasswordValue,
        isValid: currentPasswordIsValid,
        hasError: currentPasswordHasError,
        valueChangeHandler: currentPasswordChangeHandler,
        inputBlurHandler: currentPasswordBlurHandler,
        reset: resetCurrentPassword,
        passwordShown: currentPasswordShow,
        togglePassword: currentPasswordShowHandler,
        showPassFalse:showPassFalse1
    } = useInput(isPassword);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        togglePassword: passwordShowHandler,
        passwordShown: passwordShow,
        reset: resetPassword,
        isTouched:passwordIsTouched,
        showPassFalse:showPassFalse2
    } = useInput(isPassword);

    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword,
        passwordShown: confirmPasswordShow,
        togglePassword: confirmPasswordShowHandler,
        isTouched: confirmPasswordIsTouched,
        showPassFalse:showPassFalse3
    } = useInput(isPassword);

    const customStyles = {
        content: {
            padding: '64px 121px',
            maxWidth: '730px',
            width: '100%',
            height:'490px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    let formIsValid = false;
    if (currentPasswordIsValid
        && passwordIsValid
        && confirmPasswordIsValid
    ) {
        formIsValid = true;
    }

    let hasError = false;
    let hasPasswordError=false;
    let confirmPasswordMessage=null;
    let passwordMessage=null;
    if(password !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }
    if(password === currentPasswordValue) {
        hasPasswordError = true;
        passwordMessage = "New and current passwords are the same"
    }

    function closeAndResetChangePasswordModal(){
        props.closeChangePasswordModal ();
        resetCurrentPassword();
        resetPassword();
        resetConfirmPassword();
        showPassFalse1();
        showPassFalse2();
        showPassFalse3();
    }



    const values = {
        old_password:currentPasswordValue,
        password:password,
        password2:confirmPasswordValue
    }


    let changePasswordData  = async (values) => {
        try {
            let response = await axios.put(`${config.baseUrl}auth/change_password/${id}/`, values,{
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                }
            })
            console.log(response.data);
            props.closeChangePasswordModal ();
            props.openPasswordChangedModal();
            console.log("success")
        } catch (error) {
            console.log("error")
            console.log(error, 'postEditProfileDataError');
        }
    }


    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await changePasswordData(values);
        await resetCurrentPassword();
        await resetPassword();
        await resetConfirmPassword();
        await showPassFalse1();
        await showPassFalse2();
        await showPassFalse3()
    };

    return(
        <>
            <Modal
                isOpen={props.changePassModalIsOpen}
                onRequestClose={closeAndResetChangePasswordModal}
                // onAfterOpen={props.closeSignUpModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className={classes.changePassword}>Change Password</div>
                <form onSubmit={submitHandler}>
                    <Input
                        hasError = {currentPasswordHasError}
                        errorText="Please enter password. (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)"
                        image ={EyeImg}
                        onClick={currentPasswordShowHandler}
                        input={{
                            value: currentPasswordValue,
                            placeholder: "Current Password",
                            type: currentPasswordShow ? "text" : "password",
                            onChange: currentPasswordChangeHandler,
                            onBlur: currentPasswordBlurHandler
                        }}
                    />
                    <Input
                        hasError = {passwordHasError || hasPasswordError && passwordIsTouched}
                        errorText={password === currentPasswordValue? passwordMessage: "Please enter password. (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)"}
                        image ={EyeImg}
                        onClick={passwordShowHandler}
                        input={{
                            value: password,
                            placeholder: "New Password",
                            type:passwordShow ? "text" : "password",
                            onChange: passwordChangeHandler,
                            onBlur: passwordBlurHandler,
                        }}
                    />
                    <Input
                        hasError = {hasError && confirmPasswordIsTouched}
                        errorText={confirmPasswordMessage}
                        image ={EyeImg}
                        onClick={confirmPasswordShowHandler}
                        input={{
                            value: confirmPasswordValue,
                            placeholder: "Confirm New Password",
                            type:confirmPasswordShow ? "text" : "password",
                            onChange: confirmPasswordChangeHandler,
                            onBlur: confirmPasswordBlurHandler,
                            // onKeyPress:handleKeyPress
                        }}
                    />
                    <PurpleBigButton  disabled={!formIsValid}
                                      type={"submit"}>Save</PurpleBigButton>
                </form>
            </Modal>
        </>
    )
}


export default ChangePasswordModal;

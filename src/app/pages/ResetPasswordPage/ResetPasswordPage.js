import React from "react";

import Logo from "../../assets/images/Logo.png";
import classes from './ResetPasswordPage.module.css';
import useValidate from "../../hooks/useValidate";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Inputs/Input";
import EyeImg from "../../assets/images/EyeImg.png";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import {useNavigate} from "react-router-dom";


function ResetPasswordPage(props) {
    const navigate = useNavigate();
    const {isPassword}=useValidate()

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        togglePassword: passwordShowHandler,
        passwordShown: passwordShow,
        reset: resetPassword,
    } = useInput(isPassword);

    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword,
        passwordShown: confirmPasswordShow,
        togglePassword: confirmPasswordShowHandler,
        isTouched: confirmPasswordIsTouched
    } = useInput(isPassword);




    let hasError = false;
    let confirmPasswordMessage=null;
    if(password !== confirmPasswordValue){
        hasError = true;
        confirmPasswordMessage = "Passwords do not match"
    }

    let formIsValid = false;
    if (passwordIsValid
        && confirmPasswordIsValid
    ) {
        formIsValid = true;
    }


    const submitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetPassword();
        resetConfirmPassword();
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    return(
    <div className={classes.resetWholeDiv}>
        <div className={classes.resetsDiv}>
            <div className={classes.logoDiv}>
                <img className="logoClass"  src={Logo}/>
            </div>
            <div className={classes.resetPassword}>Reset  Password</div>
            <form onSubmit={submitHandler}>
                <Input
                    hasError = {passwordHasError}
                    errorText="Please enter password. (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)"
                    image ={EyeImg}
                    onClick={passwordShowHandler}
                    input={{
                        value: password,
                        placeholder: "Password",
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
                        placeholder: "Confirm Password",
                        type: confirmPasswordShow ? "text" : "password",
                        onChange: confirmPasswordChangeHandler,
                        onBlur: confirmPasswordBlurHandler,
                        onKeyPress:handleKeyPress
                    }}
                />
                <PurpleBigButton  disabled={!formIsValid} OnClick={()=> navigate('/myProfile')} type={"submit"}>Save</PurpleBigButton>
            </form>
        </div>
    </div>

)
}


export default ResetPasswordPage;
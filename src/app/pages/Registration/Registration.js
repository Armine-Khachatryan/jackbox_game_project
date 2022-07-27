import React from "react";
import LoginAndRegistrationPart from "../../components/LoginAndRegistrationPart/LoginAndRegistrationPart";
import Input from "../../UI/Inputs/Input";
import useInput from "../../hooks/useInput";
import useValidate from "../../hooks/useValidate";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import axios from "axios";
import config from "../../config";
import {useNavigate} from "react-router-dom";
import EyeImg from "../../assets/images/EyeImg.png";
import {useDispatch, useSelector} from "react-redux";
import GoogleLogin from "react-google-login";
import Google_Logo from "../../assets/images/Google_Logo.png";
import classes from "../Registration/Registration.module.css"
import WhiteBigButton from "../../UI/WhiteBigButton/WhiteBigButton";





function Registration (){

    let dispatch = useDispatch()
    const navigate = useNavigate();
    const {isName, isNotEmpty, isEmail, isPassword}=useValidate()




    const {
        value: first_name,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName,
    } = useInput(isName);

    const {
        value: last_name,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName,
    } = useInput(isName);

    const {
        value: username,
        isValid: nickNameIsValid,
        hasError: nicknameHasError,
        valueChangeHandler: nicknameChangeHandler,
        inputBlurHandler: nicknameBlurHandler,
        reset: resetNickname,
    } = useInput(isNotEmpty);

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);

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
    if (firstNameIsValid
        && lastNameIsValid
        && nickNameIsValid
        && emailIsValid
        && passwordIsValid
        && confirmPasswordIsValid
    ) {
        formIsValid = true;
    }


    const values= {
        first_name:first_name,
        last_name:last_name,
        username:username,
        email:email,
        password:password
    }

    let postRegistration = async (values)=> {
        // console.log(values , "values")
        try {
            // values['username'] = values['email']
            let response = await axios.post(`${config.baseUrl}auth/register/`, values)
            console.log(response, 'registration response');
            // console.log(response.data, 'registration response data');
            dispatch({
                    type: "REGISTRATION",
                    payload:response.data
                }
            )
            navigate('/verifyEmail');
        }
        catch (e) {
            console.log(e.response, 'registrationError');
        }
    }

    const responseGoogle = (response) => {
        console.log(response, "googleResponse");
        console.log(response.profileObj);
    }


    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await postRegistration(values);
        await  resetFirstName();
        await resetLastName();
        await  resetNickname();
        await  resetEmail();
        await   resetPassword();
        await   resetConfirmPassword();
    };
        // axios.post(`${config.baseUrl}api/v1/users`, values)
        //     .then  (response  =>  {
        //         console.log(response.data)
        //         dispatch ({
        //             type: "Registration",
        //             payload:response.data
        //         })
        //     })
        //     .catch(error => {
        //         if (error.response.status >= 400 && error.response.status < 499) {
        //             console.log(error, "registration error")
        //         }
        //     })

    let emailMessage =null;
    if(!email){
        emailMessage = "Email is required";
    }
    else if (!emailIsValid){
        emailMessage = "Invalid email";
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }



    return (
        <div className="entireDiv">
            <div className= {classes.registrationDiv}>
                <LoginAndRegistrationPart/>
                <GoogleLogin
                    clientId="955986371702-dp992d160lr6tpihcri31rid4g46osu6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={()=>{navigate('/myProfile')}}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                        <WhiteBigButton  OnClick={renderProps.onClick} disabled={renderProps.disabled} btnImage={Google_Logo}>
                            Sign in with Google
                        </WhiteBigButton>
                    )}
                />
                <div className={classes.orBigDiv}>
                    <div className={classes.orSmallDiv}>Or</div>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="buttonsSmallDiv">
                        <Input
                            hasError = {firstNameHasError}
                            errorText="Please enter first name."
                            input={{
                                value: first_name,
                                placeholder: "First Name",
                                type: "text",
                                onChange: firstNameChangeHandler,
                                onBlur: firstNameBlurHandler
                            }}
                        />
                    </div>
                    <div className="buttonsSmallDiv">
                        <Input
                            hasError = {lastNameHasError}
                            errorText="Please enter last name."
                            input={{
                                value: last_name,
                                placeholder: "Last Name",
                                type: "text",
                                onChange: lastNameChangeHandler,
                                onBlur: lastNameBlurHandler
                            }}
                        />
                    </div>
                    <div className="buttonsSmallDiv">
                        <Input
                            hasError = {nicknameHasError}
                            errorText="Please enter a Nickname."
                            input={{
                                value: username,
                                placeholder: "Nickname",
                                type: "text",
                                onChange: nicknameChangeHandler,
                                onBlur: nicknameBlurHandler
                            }}
                        />
                    </div>
                    <div className="buttonsSmallDiv">
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
                    </div>
                    <div className="buttonsSmallDiv">
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
                    </div>
                    <div className="buttonsSmallDiv">
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
                    </div>
                    <PurpleBigButton  disabled={!formIsValid} type={"submit"}>Next</PurpleBigButton>
                </form>
            </div>
        </div>
    )
}


export default Registration;
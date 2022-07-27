import React, {useEffect, useState} from "react";
import LoginAndRegistrationPart from "../../components/LoginAndRegistrationPart/LoginAndRegistrationPart";
import Input from "../../UI/Inputs/Input";
import EyeImg from "../../assets/images/EyeImg.png";
import {useNavigate} from "react-router-dom";
import useValidate from "../../hooks/useValidate";
import useInput from "../../hooks/useInput";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import WhiteBigButton from "../../UI/WhiteBigButton/WhiteBigButton";
import classes from './Login.module.css';
import axios from "axios";
import config from "../../config";
import {useDispatch} from "react-redux";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";
import GoogleLogin from "react-google-login";
import Google_Logo from "../../assets/images/Google_Logo.png";


function Login (props) {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const {isEmail, isPassword} = useValidate()
    const [loginError, setLoginError] = useState(null)
    let [forgotPassModalIsOpen, setForgotPassModalIsOpen] = useState(false);



    const responseGoogle = (response) => {
        console.log(response, "googleResponse");
        console.log(response.profileObj);
    }





    function openForgotPasswordModal() {
        setForgotPassModalIsOpen(true);
    }

    function closeForgotPasswordModal() {
        setForgotPassModalIsOpen(false)
    }

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
        isTouched: emailIsTouched
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
        isTouched: passwordIsTouched
    } = useInput(isPassword);


    let formIsValid = false;
    if (emailIsValid
        && passwordIsValid
    ) {
        formIsValid = true;
    }

    useEffect(() => {

        if(emailIsTouched || passwordIsTouched){
            setLoginError("")
        }

    },[emailIsTouched, passwordIsTouched])



    const values = {
        email: email,
        password: password
    }

    let postLogin = async (values) => {
        console.log(values, "values");
        try {
            let response = await axios.post(`${config.baseUrl}auth/login/`, values)
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);
            localStorage.setItem('loginInfoData', response.data)
            // localStorage.setItem('refreshToken',response.data.tokens.refresh)
            console.log(response.data, 'registration response data');
            props.setAccessToken(localStorage.getItem('accessToken'))
            dispatch({
                type: "LOGIN",
                payload: response.data
            })
            navigate(`/myProfile`, {state:response.data.id})
            // navigate('/myProfile');
        } catch (error) {

            if (error.response.status >= 400 && error.response.status < 499) {
                setLoginError("Password or email isn't correct");

                console.log(error);
                console.log(error.response, 'loginError');
            } else {
                setLoginError("Something went wrong");
            }
        }
    }

    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await postLogin(values);
        await resetEmail();
        await resetPassword();
    };


    let emailMessage = null;
    if (!email) {
        emailMessage = "Email is required";
    } else if (!emailIsValid) {
        emailMessage = "Invalid email";
    }


    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    return (
        <>
            <div className="entireDiv">
                <div className={classes.loginDiv}>
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
                                loginError={loginError}
                                hasError={emailHasError}
                                errorText={emailMessage}
                                input={{
                                    value: email,
                                    // value: "kate@gmail.com",
                                    placeholder: "Email",
                                    type: "email",
                                    onChange: emailChangeHandler,
                                    onBlur: emailBlurHandler
                                }}
                            />
                        </div>
                        <Input
                            loginError={loginError}
                            hasError={passwordHasError}
                            errorText="Please enter password. (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)"
                            image={EyeImg}
                            onClick={passwordShowHandler}
                            input={{
                                value: password,
                                // value: "zxcVBN123*",
                                placeholder: "Password",
                                type: passwordShow ? "text" : "password",
                                onChange: passwordChangeHandler,
                                onBlur: passwordBlurHandler,
                                onKeyPress: handleKeyPress
                            }}
                        />
                        <div className={classes.forgotPass} onClick={openForgotPasswordModal}>Forgot password?</div>
                        <PurpleBigButton disabled={!formIsValid} type={"submit"}>Log In</PurpleBigButton>
                        {loginError && <div className={classes.loginError}>{loginError}</div>}
                    </form>
                    <div className={classes.lineDiv}></div>
                    <div className={classes.accountText} onClick={() => navigate('/registration')}>Don’t have an account
                        ?
                    </div>
                    <WhiteBigButton OnClick={() => navigate('/registration')}>Create New Account</WhiteBigButton>
                </div>
            </div>
            <ResetPasswordModal forgotPassModalIsOpen={forgotPassModalIsOpen}
                                closeForgotPasswordModal={closeForgotPasswordModal}/>
        </>
    )
}


export default Login;
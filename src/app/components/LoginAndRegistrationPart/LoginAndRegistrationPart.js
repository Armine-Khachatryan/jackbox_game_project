import React from "react";
import Logo from "../../assets/images/Logo.png";
import classes from './LoginAndRegistrationPart.module.css';


function LoginAndRegistrationPart (){

    return(
        <>
            <div className={classes.logoRegistrationDiv}>
                <img className="logoClass" src={Logo}/>
            </div>
            <div className={classes.welcomeTitle}>Welcome to game</div>
        </>
    )
}

export default LoginAndRegistrationPart;
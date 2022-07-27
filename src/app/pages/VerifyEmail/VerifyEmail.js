import React from "react";
import classes from "./VerifyEmail.module.css";





function VerifyEmail (){



    return(
        <div className="entireDiv">
            <div className={classes.verifyDiv}>
                <div className={classes.helloDiv}>Hello</div>
                <div className={classes.verifyTextDiv && classes.first}>Please click the button below to verify your email address</div>
                <button className={classes.verifyBtn}>Verify email address</button>
                <div className={classes.verifyTextDiv}>If you did not create an account, no further actions is required</div>
                <div className={classes.verifyTextDiv}>Regards: Game Team</div>
            </div>
        </div>

    )
}


export default VerifyEmail;
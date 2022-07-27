import React from "react";
import classes from './ResetPasswordMessagePage.module.css';




function ResetPasswordMessagePage (){


    return (
        <div className={classes.wholePage}>
            <div className={classes.resetMessageDiv}>
                <div className={classes.helloDiv}>Hello</div>
                <div className={classes.resetTextDiv}>You are receiving this email because we have received a password
                    reset request for your account </div>
                               <div className={classes.regards}>Regards: Game Team</div>
            </div>
        </div>

    )


}

export default ResetPasswordMessagePage;
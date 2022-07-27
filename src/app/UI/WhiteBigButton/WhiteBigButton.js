import React from "react";
import classes from './WhiteBigButton.module.css';


function WhiteBigButton (props) {

    return(
        <div className={classes.whiteBigBtnDiv}>
            <button
                    onClick={props.OnClick}>
                {props.children}
            </button>
            {props.btnImage &&
                <div className={classes.iconDiv}>
                    <img src={props.btnImage} className={classes.iconStyle}/>
                </div>
            }
        </div>
    )
}


export default WhiteBigButton;

import React from "react";
import classes from './PurpleBigButton.module.css';



function PurpleBigButton (props) {
    return(
        <button className={classes.purpleBigButton}
            type={props.type || 'button'}
                disabled={props.disabled}
                onClick={props.OnClick}>
                {props.children}
        </button>
    )
}


export default PurpleBigButton;
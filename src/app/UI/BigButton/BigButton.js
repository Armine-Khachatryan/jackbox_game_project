import React from "react";
import classes from './BigButton.module.css';



function BigButton (props) {
    return(
        <button className={classes.bigButton}
                // type={props.type || 'button'}
                onClick={props.OnClick}>
            {props.children}
        </button>
    )
}


export default BigButton;
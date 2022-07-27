import React from "react";
import classes from './Input.module.css';


function Input (props) {

    return (
        <div
            className={classes.control}
        >
            {props.label && <label htmlFor={props.input.id}>{props.label}</label>}
            <div className={classes.inputDiv}>
                <input className={`${props.hasError || props.loginError? classes.invalid: ""}`}
                       {...props.input}
                />
                {props.input.value && <img src={props.image} onClick={props.onClick}/>}
            </div>
            {props.hasError && <div className={classes.textDanger}>{props.errorText}</div>}
        </div>
    )
}

export default Input;
import React from "react";
import classes from './RangeSlider.module.css';



function RangeSlider (props){


    return ( <div className={classes.sliderParent}>
            <input
                className={classes.sliderInput}
                value={props.value}
                onChange={props.onHandleChange}
                style={{'background': `linear-gradient(to right,  #6279FA 0%, rgba(29, 27, 135, 0.8)  ${(parseInt(props.value)-1)*100/(60-1)}%,#D0D0D0 0px`}}
                type="range"
                min="1"
                max="60"
            />
            <div className={classes.bubble}>
                {props.value}
            </div>
        </div>
    );
}


export default RangeSlider;
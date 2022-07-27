import React from "react";
import Home from "../../assets/images/Home.png"
import classes from "./BackHome.module.css";
import {useNavigate} from "react-router-dom";



function BackHome (){

    const navigate = useNavigate();

    return(
        <div className={classes.backHomeDiv} onClick={()=>navigate('/myProfile')}>
                <img src={Home} className={classes.homeImg}/>
            <div className={classes.backHome}>Back to home</div>
        </div>
    )
}

export default BackHome;
import React, {useEffect} from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './GameStarting.module.css';



function GameStarting (){
    let refreshToken = useRefreshToken();

    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])

    return(
        <div className={classes.gameStartingWholeDiv}>
        </div>
    )
}

export default GameStarting;



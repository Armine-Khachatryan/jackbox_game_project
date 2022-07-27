import React, {useState, useEffect} from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './GameStartingPage.module.css';


function GameStartingPage (){
    const [countDownDate, setCountDownDate] = useState("5")
    let refreshToken = useRefreshToken();
    useEffect(() => {
        const interval = setInterval(() => {

            if(countDownDate > 0){
                setCountDownDate(countDownDate -1)
            }
            else{
                return
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);


    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])

    return(
    <div className={classes.gameStartingDiv}>
        <div className={classes.countDiv}>
            {countDownDate}
        </div>
    </div>
    )
}


export default GameStartingPage;
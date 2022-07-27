import React, {useEffect} from "react";
import Logo from "../../assets/images/Logo.png";
import BackHome from "../../components/BackHome/BackHome";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './TeamCreationPageHost.module.css';
import TeamFormHost from "../../components/TeamFormHost/TeamFormHost";




function TeamCreationPageHost (){

    let refreshToken = useRefreshToken();

    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])



    return (
        <>
            <BackHome/>
            <div className={classes.entireTeamDiv}>
                <div className="smallContainer">
                    <div className={classes.logoImgDiv3}>
                        <img className="logoClass"  src={Logo}/>
                    </div>
                    <div className={classes.inputsAndButton}>
                       <TeamFormHost/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamCreationPageHost;
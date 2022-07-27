import React, {useEffect} from "react";
import Logo from "../../assets/images/Logo.png";
import TeamForm from "../../components/TeamForm/TeamForm";
import BackHome from "../../components/BackHome/BackHome";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './TeamCreationPage.module.css';



function TeamCreationPage (){
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
                     <TeamForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamCreationPage;
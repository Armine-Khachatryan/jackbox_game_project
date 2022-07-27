import React, {useEffect, useState} from "react";
import Logo from "../../assets/images/Logo.png";
import BigButton from "../../UI/BigButton/BigButton";
import classes from './TeamPage.module.css';
import {useNavigate} from "react-router-dom";
import VectorDown from "../../assets/images/VectorDown.png";
import VectorUp from "../../assets/images/VectorUp.png";
import BackHome from "../../components/BackHome/BackHome";
import useRefreshToken from "../../hooks/useRefreshToken";


function TeamPage () {
    const navigate = useNavigate();
    const [showTeams, setShowTeams]=useState(false);
    let refreshToken = useRefreshToken();

    const handleRouteTeamCreationPage =() => {
        navigate('/teamCreationPageHost');
    }
    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])
    return (
        <>
            <BackHome/>
        <div className="entireDiv">
            <div className="smallContainer">
                <div className={classes.logoImgDiv2}>
                    <img  className="logoClass" src={Logo}/>
                </div>
                <div className="buttonsDiv">
                    <div className="buttonsSmallDiv">
                        <BigButton OnClick={handleRouteTeamCreationPage}>Create New Team</BigButton>
                    </div>
                    <BigButton OnClick={()=>setShowTeams(!showTeams)}> Saved Teams
                        {!showTeams?<img className={classes.vectorDownUp} src={VectorDown} onClick={()=>setShowTeams(!showTeams)}/>:
                        <img className={classes.vectorDownUp}  src={VectorUp}/> }
                        </BigButton>
                {showTeams?
                    <div className={classes.teamsBelowDiv}>
                        <div className={classes.teamName}>Team1</div>
                        <div className={classes.teamName}>Team2</div>
                        <div className={classes.teamName}>Team3</div>
                    </div>
                    :""
                    }
                </div>
            </div>
        </div>
        </>
    )
}


export default TeamPage;
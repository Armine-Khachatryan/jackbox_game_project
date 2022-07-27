import React, {useEffect, useState} from "react";
import Logo from "../../assets/images/Logo.png";
import BigButton from "../../UI/BigButton/BigButton";
import classes from './TeamPageHost.module.css';
import VectorDown from "../../assets/images/VectorDown.png";
import VectorUp from "../../assets/images/VectorUp.png";
import BackHome from "../../components/BackHome/BackHome";
import useRefreshToken from "../../hooks/useRefreshToken";
import {useNavigate} from "react-router-dom";



function TeamPageHost () {


    const navigate = useNavigate();
    const [showRooms, setShowRooms]=useState(false);
    let refreshToken = useRefreshToken();

    const handleRouteRoomCreationPageHost =() => {
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
                        <BigButton OnClick={handleRouteRoomCreationPageHost}>Create New Room</BigButton>
                    </div>
                    <BigButton OnClick={()=>setShowRooms(!showRooms)}> Saved Rooms
                        {!showRooms?<img className={classes.vectorDownUp} src={VectorDown} onClick={()=>setShowRooms(!showRooms)}/>:
                            <img className={classes.vectorDownUp}  src={VectorUp}/> }
                    </BigButton>
                    {showRooms?
                        <div className={classes.teamsBelowDiv}>
                            <div className={classes.teamName}>Room1</div>
                            <div className={classes.teamName}>Room2</div>
                            <div className={classes.teamName}>Room3</div>
                        </div>
                        :""
                    }
                </div>
            </div>
        </div>
    </>
)
}


export default TeamPageHost;
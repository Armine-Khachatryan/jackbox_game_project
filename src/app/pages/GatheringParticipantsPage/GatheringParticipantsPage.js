import React, {useEffect, useState} from "react";
import Logo from '../../assets/images/Logo.png';
import CharacterImg1 from '../../assets/images/CharacterImg1.png';
import classes from './GatheringParticipantsPage.module.css';
import BackHome from "../../components/BackHome/BackHome";
import useRefreshToken from "../../hooks/useRefreshToken";

function GatheringParticipantsPage (){
    let refreshToken = useRefreshToken();

    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])


    return(
        <>
            <BackHome/>
            <div className="entireDiv">
                <div className={classes.boxAndLogo}>
                    <div className={classes.logoImgDiv}>
                        <img className="logoClass" src={Logo}/>
                    </div>
                    <div className={classes.boxGatheringDiv}>
                        <div className={classes.gameDetailsGathering}>
                            <div className={classes.gameDetailNameGathering}>Team Name :
                                <span className={classes.gameDetailValueGathering}> Team 1</span>
                            </div>
                        </div>
                        <div className={classes.gameDetailsGathering}>
                            <div className={classes.gameDetailNameGathering}>Number of Players :
                                <span className={classes.gameDetailValueGathering}> 6</span>
                            </div>
                        </div>
                        <div className={classes.gameDetailsGathering}>
                            <div className={classes.gameDetailNameGathering}>Game ID :
                                <span className={classes.gameDetailValueGathering}> 12356</span>
                            </div>
                        </div>
                        <div className={classes.waitingDiv}>Please wait until everyone enters the game</div>
                        <div className={classes.alreadyEnteredWord}>Already entered</div>
                        <div className={classes.alreadyEnteredOnes}>
                            <div className={classes.personEntered}>
                                <div className={classes.characterDiv}>
                                    <img src={CharacterImg1} alt="Character image"/>
                                </div>
                                <div className={classes.characterName}>You</div>
                            </div>
                            <div className={classes.personEntered}>
                                <div className={classes.characterDiv}>
                                    <img src={CharacterImg1} alt="Character image"/>
                                </div>
                                <div className={classes.characterName} alt="Character image">Josh</div>
                            </div>
                            <div className={classes.personEntered}>
                                <div className={classes.characterDiv}>
                                    <img src={CharacterImg1} alt="Character image"/>
                                </div>
                                <div className={classes.characterName}>Bub</div>
                            </div>
                            <div className={classes.personEntered}>
                                <div className={classes.characterDiv}>
                                    <img src={CharacterImg1} alt="Character image"/>
                                </div>
                                <div className={classes.characterName}>Tom</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default GatheringParticipantsPage;
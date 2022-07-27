import React, {useEffect, useState} from "react";
import Logo from '../../assets/images/Logo.png';
import BackHome from "../../components/BackHome/BackHome";
import CharacterImg1 from '../../assets/images/CharacterImg1.png';
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './ChoosingCharacterPage.module.css';


const imgData = [
    {
        img:CharacterImg1,
    },
    {
        img:CharacterImg1,
    },
    {
        img:CharacterImg1,
    },
    {
        img:CharacterImg1,
    },
    {
        img:CharacterImg1,
    },
    {
        img:CharacterImg1,
    },

];



function ChoosingCharacterPage (){

    const [name, setName]=useState("");
    let refreshToken = useRefreshToken();

    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])

    const itemImg = imgData.map((item, index) =>
    <div className={classes.charactersDiv}>
        <img
            src={item.img}
            alt='Character image'
        />
    </div>)


    return (
        <>
            <BackHome/>
            <div className="entireDiv">
                <div className={classes.boxAndLogo}>
                    <div className={classes.logoImgDiv}>
                        <img  className="logoClass" src={Logo}/>
                    </div>
                    <div className={classes.boxDiv}>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Game ID :
                                <span className={classes.gameDetailValue}> 12356</span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Team Name :
                                <span className={classes.gameDetailValue}> Team 1</span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Number of cards :
                                <span className={classes.gameDetailValue}> 10</span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Time in seconds :
                                <span className={classes.gameDetailValue}> 60</span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Number of Players :
                                <span className={classes.gameDetailValue}> 6</span>
                            </div>
                        </div>

                        <div className={classes.titleCharacteristicsPage}>Type your name</div>
                        <div className={classes.shortLine}></div>
                        <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                        />
                        <div className={classes.titleCharacteristicsPage}>Choose your character</div>
                        <div className={classes.longLine}></div>
                        <div className={classes.charactersDivs}>
                            {itemImg}
                        </div>
                        <div className={classes.btnDiv}>
                            <PurpleBigButton disabled={!name}>Next</PurpleBigButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ChoosingCharacterPage;
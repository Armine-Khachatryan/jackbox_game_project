import React, {useEffect, useState} from "react";
import Logo from '../../assets/images/Logo.png';
import BackHome from "../../components/BackHome/BackHome";
import CharacterImg1 from '../../assets/images/CharacterImg1.png';
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import useRefreshToken from "../../hooks/useRefreshToken";
import ContentCopy from '../../assets/images/ContentCopy.png';
import classes from './ChoosingCharacterPageHost.module.css';
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import axios from "axios";
import config from "../../config";
import {useLocation} from "react-router-dom";


const imgData = [
    {
        img: CharacterImg1,
    },
    {
        img: CharacterImg1,
    },
    {
        img: CharacterImg1,
    },
    {
        img: CharacterImg1,
    },
    {
        img: CharacterImg1,
    },
    {
        img: CharacterImg1,
    },

];


function ChoosingCharacterPageHost() {

    const [name, setName] = useState("");
    let refreshToken = useRefreshToken();
    const {state} = useLocation();
    console.log(state)
    const idGame = state;
    console.log(idGame, "idGame")
    const [gameInfo, setGameInfo] = useState({})
    const [numberOfCards, setNumberOfCards]=useState("1");
    const [numberOfSeconds, setNumberOfSeconds]=useState("1");

    useEffect(() => {
        console.log("refresh token")
        refreshToken();
        choosingCharacterPageInfo()

    }, [])


    let choosingCharacterPageInfo = async (values) => {
        console.log(values, "values");
        try {
            let response = await axios.get(`${config.baseUrl}room/${idGame}`)
            console.log(response.data, "res data")
            setGameInfo(response.data);
            // setAllUsers([...response.data.results]);

        } catch (error) {
            console.log(error);
            console.log(error.response, 'choosingCharacterPageInfo');
        }
    }

    console.log(gameInfo, "gameInfo")


    const itemImg = imgData.map((item, index) =>
        <div className={classes.charactersDiv}>
            <img
                src={item.img}
                alt='Character image'
            />
        </div>)


    const membersArray = [];
    console.log(gameInfo, '844444444')


    if (gameInfo.members) {
        for (let i = 0; i < gameInfo.members.length; i++) {
            if(i===gameInfo.members.length-1){
                membersArray.push(gameInfo.members[i].username)
            }
            else{
                membersArray.push(gameInfo.members[i].username + ", ")
            }
        }
    }
    console.log(membersArray, "membersArray")


console.log(numberOfCards, 'numberOfCards')
    console.log(numberOfSeconds, 'numberOfSeconds')

    return (
        <>
            <BackHome/>
            <div className="entireDiv">
                <div className={classes.boxAndLogo}>
                    <div className={classes.logoImgDiv}>
                        <img className="logoClass" src={Logo}/>
                    </div>
                    <div className={classes.boxDiv}>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Team Name :
                                <span className={classes.gameDetailValue}> {gameInfo?.name}
                                </span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Judge :
                                <span className={classes.gameDetailValue}> {gameInfo.judge?.last_name}
                                </span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Number of Players :
                                <span className={classes.gameDetailValue}> {gameInfo && gameInfo.limit}
                                </span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Players :
                                <span className={classes.gameDetailValue}> {membersArray}</span>
                            </div>
                        </div>
                        <div className={classes.gameDetails}>
                            <div className={classes.gameDetailName}>Game ID :
                                <span className={classes.gameDetailValue}> {idGame}</span>
                                <span className={classes.copy}>Copy ID</span>
                                <img src={ContentCopy}/>
                            </div>
                        </div>
                        <div className={classes.titleCharacteristicsPage}>Type your name</div>
                        <div className={classes.shortLine}></div>
                        <input className={classes.boxDivInput} type="text" placeholder="Your name" value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                        <div className={classes.titleCharacteristicsPage}>Choose your character</div>
                        <div className={classes.longLine}></div>
                        <div className={classes.charactersAndRanges}>
                            <div className={classes.charactersDivs}>
                                {itemImg}
                            </div>
                            <div className={classes.ranges}>
                                <div className={classes.subRanges}>
                                    <div className={classes.titleCharacteristicsPage}> Number of cards</div>
                                    <div className={classes.shortLine}></div>
                                    <RangeSlider value={numberOfCards} onHandleChange={(event)=>setNumberOfCards(event.target.value)}/>
                                </div>
                                <div className={classes.subRanges}>
                                    <div className={classes.titleCharacteristicsPage}> Number of seconds</div>
                                    <div className={classes.shortLine}></div>
                                    <RangeSlider value={numberOfSeconds} onHandleChange={(event)=>setNumberOfSeconds(event.target.value)}/>
                                </div>
                            </div>
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


export default ChoosingCharacterPageHost;
import React, {useEffect, useState} from "react";
import WhiteLogo from '../../assets/images/WhiteLogo.png';
import HeaderIcon from '../../assets/images/HeaderIcon.png';
import HeaderModal from "../../components/HeaderModal/HeaderModal";
import useRefreshToken from "../../hooks/useRefreshToken";
import classes from './QuestionPage.module.css';


function QuestionPage (){


    let [headerModalIsOpen, setHeaderModalIsOpen] = useState(false);
    let refreshToken = useRefreshToken();


    useEffect(()=>{
        console.log("refresh token")
        refreshToken()
    },[])

    function openHeaderModal() {
        setHeaderModalIsOpen(true);
        console.log("hello")
    }

    function closeHeaderModal(){
        setHeaderModalIsOpen(false)
    }

    return(
        <>
            <div className={classes.totalPage}>
                <div className={classes.header}>
                    <div className={classes.logoDiv}>
                        <img className='logo' src={WhiteLogo} alt="logo"/>
                    </div>
                    <div className={classes.headerIcon} onClick={openHeaderModal}>
                        <img className={classes.profileIcon} src={HeaderIcon} alt="profileIcon"/>
                    </div>
                </div>
                <div className={classes.questionDiv}>What African country served as the
                    setting for Tatooine in Star Wars?</div>
            </div>
            <HeaderModal headerModalIsOpen={headerModalIsOpen} closeHeaderModal={closeHeaderModal}/>
        </>
    )
}

export default QuestionPage;
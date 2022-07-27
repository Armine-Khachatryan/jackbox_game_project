import React, {useEffect, useState} from "react";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Inputs/Input";
import useValidate from "../../hooks/useValidate";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";
import {useNavigate} from "react-router-dom";
import  'react-multiple-select-dropdown-lite/dist/index.css'
import UnstyledSelectsMultiple from "../UnstyledSelectsMultiple/UnstyledSelectsMultiple";
import axios from "axios";
import config from "../../config";
import UnstyledSelectSimple from "../UnstyledSelectInput/UnstyledSelectInput";
import {useSelector} from "react-redux";


const TeamFormHost = () => {
    let user = useSelector(store => store.user);
    let idHost = user.id;
    const navigate = useNavigate();
    const {isNotEmpty}=useValidate();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedGamers, setSelectedGamers] = useState([]);
    const [selectedJudge, setSelectedJudge]= useState("");
    let token = localStorage.getItem("accessToken");




    const handleChangeGames = (val) => {
        setSelectedGamers(val);
        console.log(selectedGamers, "selectedGamers")
    };


    const handleChangeJudge = (val) => {
        setSelectedJudge(val)
    };


    useEffect(()=>{
        createGameFeatures();
    },[])

    const {
        value: teamNameValue,
        isValid: teamNameIsValid,
        hasError: teamNameHasError,
        valueChangeHandler: teamNameChangeHandler,
        inputBlurHandler: teamNameBlurHandler,
        reset: resetTeamName,
    } = useInput(isNotEmpty);

    const {
        value: playersNumberValue,
        isValid:  playersNumberIsValid,
        hasError: playersNumberHasError,
        valueChangeHandler: playersNumberChangeHandler,
        inputBlurHandler: playersNumberBlurHandler,
        reset: resetPlayersNumber,
    } = useInput(isNotEmpty);


    let formIsValid = false;
    if (teamNameIsValid
        && playersNumberIsValid
        && selectedGamers
        && selectedJudge
    ) {
        formIsValid = true;
    }

    console.log(selectedGamers, "selectedGamers")
    console.log(selectedJudge, "selectedJudge")

    const values = {
        name:teamNameValue,
        limit:playersNumberValue,
        members:selectedGamers,
        judge:selectedJudge,
        creator:idHost
    }

    let postCreateRoom = async (values) => {
        console.log(values, "values");
        try {
            let response = await axios.post(`${config.baseUrl}room/`, values,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
           console.log(response, "response")
            console.log(response.data, "response.data")
            console.log(response.data.id ,"asasasaqqqa")
            // dispatch({
            //     type: "LOGIN",
            //     payload: response.data
            // })
            // navigate('/choosingCharacterPageHost');
            navigate(`/choosingCharacterPageHost`, {state:response.data.id})
        } catch (error) {
            console.log(error, 'createRoomError');
        }
    }

    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        await postCreateRoom(values);
        await resetTeamName();
        await resetPlayersNumber();
        await setSelectedGamers([]);
        console.log(selectedGamers);
        await setSelectedJudge("")
    };





    console.log(allUsers , "allUsers")

    let createGameFeatures = async (values) => {
        console.log(values, "values");
        try {
            let response = await axios.get(`${config.baseUrl}auth/api/profile/`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
            console.log(response.data.results, "result");
            setAllUsers(response.data.results);

        } catch (error) {
                console.log(error);
                console.log(error.response, 'loginError');
        }
    }



    return (
        <form onSubmit={submitHandler}>
            <Input
                hasError = {teamNameHasError}
                errorText="Please enter a team name."
                input={{
                    type:"text",
                    value:teamNameValue,
                    placeholder:"Team Name",
                    onChange:teamNameChangeHandler,
                    onBlur:teamNameBlurHandler,
                }}/>
            <Input
                hasError = {playersNumberHasError}
                errorText="Please enter number of players (2-15 players)."
                input={{
                    type:"number",
                    max:15,
                    min:1,
                    value:playersNumberValue,
                    placeholder:"Number of Players",
                    onChange:playersNumberChangeHandler,
                    onBlur:playersNumberBlurHandler,
                }}/>
            <UnstyledSelectsMultiple
                selectedValuesEventHandler={handleChangeGames}
                options={allUsers}
            placeholder={"Select gamers"}/>
            <UnstyledSelectSimple
                selectedValueEventHandler={handleChangeJudge}
                // options={["Full Name1" ,"Full Name2","Full Name3"]}
                options={allUsers} placeholder={"Select judge"}
            />
            <PurpleBigButton  disabled={!formIsValid} type={"submit"}>Create</PurpleBigButton>
        </form>
    );
}


export default TeamFormHost;
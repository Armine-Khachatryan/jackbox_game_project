import React from "react";
import useInput from "../../hooks/useInput";
import Input from "../../UI/Inputs/Input";
import useValidate from "../../hooks/useValidate";
import PurpleBigButton from "../../UI/PurpleBigButton/PurpleBigButton";



const TeamForm = (props) => {


    const {isNotEmpty}=useValidate();

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
         ) {
        formIsValid = true;
    }


    const submitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetTeamName();
        resetPlayersNumber();
    };


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
            <PurpleBigButton  disabled={!formIsValid} type={"submit"}>Create</PurpleBigButton>
        </form>
    );
};

export default TeamForm;
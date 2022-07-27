let user={

}


let UserReducer=(state=user,action)=>{

    if(action.type==='REGISTRATION'){
        return{
            ...state,
            ...action.payload
        }
    }
    if(action.type==='LOGIN'){
        return{
            ...state,
            ...action.payload
        }
    }
    if(action.type === "RESPONSE_PROFILE_PIC"){
        return{
            ...state,
            image:action.payload
        }
    }
    if(action.type === "REMOVE_PROFILE_IMAGE"){
        return{
            ...state,
            image:action.payload
        }
    }
    if(action.type==='RESPONSE_EDIT_PROFILE_DATA'){
        return{
            ...state,
            ...action.payload
        }
    }
    if(action.type==='ACCESS_TOKEN_UPDATE') {
        console.log(action.payload, "action.payload")
        console.log(state.tokens, "state.tokens")
        return {
            ...state,
            tokens: {
                ...state.tokens,
                access: action.payload
            }
        }
    }
    return state;
}

export default UserReducer;
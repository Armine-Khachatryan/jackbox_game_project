// let auth={
//     tokens:{
//         access:null,
//         refresh:null
//     }
// }
//
// let AuthReducer=(state=auth,action)=>{
//     if(action.type==='ACCESS_TOKEN_UPDATE'){
//         console.log(action.payload ,"action.payload")
//         return{
//             ...state,
//             tokens:{
//                 ...state.tokens,
//                 access:action.payload
//             }
//         }
//     }
//     return state;
// }
//
// export default AuthReducer;
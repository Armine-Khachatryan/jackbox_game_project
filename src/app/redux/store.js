import {createStore, combineReducers} from "redux";
import UserReducer from "./UserReducer";



let store = createStore(
    combineReducers({
        user:UserReducer
    })
)

export default store;

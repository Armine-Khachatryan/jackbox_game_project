import React from "react";
import axios from "axios";
import config from '../../app/config';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";






const useRefreshToken = ()=> {
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken =localStorage.getItem("refreshToken");
    // const token = localStorage.getItem("token");
    console.log(accessToken, "accessToken");
    console.log(refreshToken, "refreshToken");


    let postRefreshToken = async (value) => {
        try {
            let response = await axios.post(`${config.baseUrl}auth/token/refresh/`, {refresh: value})
            localStorage.setItem('accessToken', JSON.stringify(response.data.access))
            // props.setaccessToken(localStorage.getItem('accessToken'))
            // props.setRefreshToken(localStorage.getItem('refreshToken'))
            dispatch({
                type: "ACCESS_TOKEN_UPDATE",
                payload: response.data.access
            })
        } catch (e) {
            console.log(e);
            console.log(e.response, 'res');
            navigate('/login');
        }
    }
    return function (){
        if (accessToken) {
            const decodedAccess= jwt_decode(accessToken);
            console.log(decodedAccess.exp * 1000 < Date.now(), 'decoded.exp * 1000 < Date.now()');
            if (decodedAccess.exp * 1000 < Date.now()) {
                postRefreshToken(refreshToken)
            }
            return;
        }
        return;
    }
}



export default useRefreshToken;



















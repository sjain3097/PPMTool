import axios from 'axios'
import { GET_ERRORS, CREATED_NEW_USER, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken'
import decode from 'jwt-decode'
export const createNewUser = (newUser, history) => async dispatch =>{
    try{
        const res = await axios.post("http://localhost:8080/api/users/register", newUser)
        console.log(res)
        history.push("/login");
        dispatch ({
            type: CREATED_NEW_USER,
            payload: "New user is created"
        })
    }catch(errors){
        dispatch({
            type:GET_ERRORS,
            payload: errors.response.data
        })
    }
}

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", LoginRequest);
        const {token} = res.data
        localStorage.setItem("jwtToken", token)
        setJWTToken(token)
        const decoded = decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const logout = () => dispatch =>{
    localStorage.removeItem("jwtToken")
    setJWTToken(false)// deletes the token from the header
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}
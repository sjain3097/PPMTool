import axios from 'axios'
import { GET_ERRORS } from './types';

export const createNewUser = (newUser, history) => async dispatch =>{
    try{
        console.log(history)
        const res = axios.post("http://localhost:8080/api/users/register", newUser)
        console.log(res)
        history.push("/login");
        dispatch ({
            type:GET_ERRORS,
            payload: {}
        })
    }catch(errors){
        console.log(errors)
        dispatch({
            type:GET_ERRORS,
            payload: errors.response.data
        })
    }
}
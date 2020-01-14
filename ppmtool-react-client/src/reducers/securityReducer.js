import {SET_CURRENT_USER} from '../actions/types'

const initialStage = {
    user: {},
    validToken: false
}

export default function (state=initialStage, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                validToken: action.payload ?
                                 true 
                                 :false,
                user: action.payload
            }
        default:
            return state;
    }
}
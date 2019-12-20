import { combineReducers } from "redux"
import ErrorReducer from "./ErrorReducer";
import projectReducer from './projectReducer'
import backlogReducer from "./backlogReducer";
import userReducer from "./userReducer";

export default combineReducers({
    errors: ErrorReducer,
    project: projectReducer,
    backlog: backlogReducer,
    user: userReducer
});
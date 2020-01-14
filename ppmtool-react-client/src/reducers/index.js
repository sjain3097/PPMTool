import { combineReducers } from "redux"
import ErrorReducer from "./ErrorReducer";
import projectReducer from './projectReducer'
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
    errors: ErrorReducer,
    project: projectReducer,
    backlog: backlogReducer,
    security: securityReducer
});
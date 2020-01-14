import axios from 'axios'
import { GET_ERRORS, GET_BACKLOG, UPDATE_PROJECT_TASK, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';

export const addProjectTask = (backlog_id, project_task, history)=>async dispatch =>{
    try{
        const res = await axios.post(`http://localhost:8080/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        console.log(res)
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
} 

export const getProjectTasks = (backlog_id) => async dispatch=> {
    try{
        const res = await axios.get(`http://localhost:8080/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    }catch(errors){
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
} 
export const getProjectTask = (backlog_id, pt_id) => async dispatch=> {
    try{
        const res = await axios.get(`http://localhost:8080/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        })
    }catch(errors){
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
} 

export const updateProjectTask = (backlog_id, pt_id, projectTask, history) => async dispatch => {
    try{
        const res = await axios.patch(`http://localhost:8080/api/backlog/${backlog_id}/${pt_id}`, projectTask);
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            type: UPDATE_PROJECT_TASK,
            payload: res.data
        })
    }catch(errors){
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
}

export const deleteProjectTask = (backlog_id, pt_id, history) => async dispatch => {
    if(window.confirm(`You are deleting project task ${pt_id}, this.action cannot be reversed`)){
        await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`)
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        })
    }
}
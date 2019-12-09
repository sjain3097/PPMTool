import axios from 'axios'
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from './types'

export const createProject = (project, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/project", project)
        history.push("/dashboard")
        console.log(res)
    } catch (error) { 
        console.log(error)
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const getProjects = () => async dispatch =>{
    const res = await axios.get("/api/project/all")
    dispatch({
        type:GET_PROJECTS,
        payload: res.data
    })
} 

export const getProject =(id, history) => async dispatch => {
    const res = await axios.get(`/api/project/${id}`)
    dispatch({
        type:GET_PROJECT,
        payload: res.data 
    })
}

export const updateProject = (id, project, history) => async dispatch => {
    console.log(project)
    try{
        const res = await axios.put(`/api/project/${id}`, project)
        history.push("/dashboard");
        dispatch({
            type:GET_ERRORS,
            payload:res.data
        })
    }catch(error){
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const deleteProject = (id, history) => async dispatch =>{
    if(window.confirm("Are you sure you want to delete this project?")){
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type:DELETE_PROJECT,
            payload: id
        })    
    }
    
}
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
    PROJECT_SET_VALUE,
    PROJECT_FETCH_PROJECTS_REQUEST,
    PROJECT_FETCH_PROJECTS_SUCCESS,
    PROJECT_FETCH_PROJECTS_FAILURE
} from './types';

export const projectSetValue = (key: string, value: any) => {
    return {
        type: PROJECT_SET_VALUE,
        key: key,
        value: value
    }
}

export const projectFetchProjects = () => {
    return dispatch => {
        dispatch({
            type: PROJECT_FETCH_PROJECTS_REQUEST
        });
        return axios.post(`http://localhost:8080/api/projects`, {}, {
            withCredentials: true
        })
        .then((res: AxiosResponse) => {
            if (res.data) {
                dispatch({
                    type: PROJECT_FETCH_PROJECTS_SUCCESS,
                    list: res.data.projects
                });
            } else {
                dispatch({
                    type: PROJECT_FETCH_PROJECTS_FAILURE,
                    message: res.data.message
                });
            }
        })
        .catch((err: AxiosError) => {
            dispatch({
                type: PROJECT_FETCH_PROJECTS_FAILURE,
                message: err.response ? err.response.data.message : err.message
            });
        })  
    }
}
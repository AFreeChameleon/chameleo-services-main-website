import axios, { AxiosResponse } from 'axios';
import {
    MAIN_URL
} from '../../../../globals';
import {
    SET_PROJECT_ID,
    SET_PROJECT_SECRET,

    FETCH_AUTH_PROJECT_REQUEST,
    FETCH_AUTH_PROJECT_SUCCESS,
    FETCH_AUTH_PROJECT_FAILURE,

    POST_AUTH_START_CONTAINER_REQUEST,
    POST_AUTH_START_CONTAINER_SUCCESS,
    POST_AUTH_START_CONTAINER_FAILURE
} from './types';

export const setProjectId = (project_id: string) => {
    return {
        type: SET_PROJECT_ID,
        project_id: project_id
    }
}

export const setProjectSecret = (project_secret: string) => {
    return {
        type: SET_PROJECT_SECRET,
        project_secret: project_secret
    }
}

export const fetchAuthProjectDetails = (project_id: string) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_AUTH_PROJECT_REQUEST
        });
        return axios.get(`${MAIN_URL}/api/projects/${project_id}/auth`)
            .then((res: AxiosResponse) => {
                if (res.data) {
                    dispatch({
                        type: FETCH_AUTH_PROJECT_SUCCESS,
                        data: res.data.containers
                    })
                } else {
                    dispatch({
                        type: FETCH_AUTH_PROJECT_FAILURE,
                        error: 'Auth container not found.'
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_AUTH_PROJECT_FAILURE,
                    error: 'Error while fetching Auth container.'
                })
            })
    }
}

export const startContainer = (project_id: string, project_secret: string) => {
    return (dispatch) => {
        dispatch({
            type: POST_AUTH_START_CONTAINER_REQUEST
        });
        return axios.post(`${MAIN_URL}/api/projects/${project_id}/auth/start`, {
            project_secret: project_secret
        })
        .then((res: AxiosResponse) => {
            if (res.data) {
                dispatch({
                    type: POST_AUTH_START_CONTAINER_SUCCESS,
                    data: res.data.containers
                })
            } else {
                dispatch({
                    type: POST_AUTH_START_CONTAINER_FAILURE,
                    error: res.data.message
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: POST_AUTH_START_CONTAINER_FAILURE,
                error: 'Error while starting Auth container.'
            })
        })
    }
}
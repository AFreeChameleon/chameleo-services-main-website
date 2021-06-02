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

    FETCH_PROJECT_DETAILS_REQUEST,
    FETCH_PROJECT_DETAILS_SUCCESS,
    FETCH_PROJECT_DETAILS_FAILURE,

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

export const fetchProjectDetails = (project_id: string) => {
    return dispatch => {
        dispatch({
            type: FETCH_PROJECT_DETAILS_REQUEST
        });
        return axios.get(`${MAIN_URL}/api/projects/${project_id}/details`, { withCredentials: true })
            .then((res: AxiosResponse) => {
                dispatch({
                    type: FETCH_PROJECT_DETAILS_SUCCESS,
                    data: res.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_PROJECT_DETAILS_FAILURE,
                    error: 'Error while fetching project details.'
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
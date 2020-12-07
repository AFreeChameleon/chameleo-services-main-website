import axios, { AxiosResponse } from 'axios';
import {
    MAIN_URL
} from '../../../../globals';
import {
    SET_PROJECT_ID,

    FETCH_AUTH_PROJECT_REQUEST,
    FETCH_AUTH_PROJECT_SUCCESS,
    FETCH_AUTH_PROJECT_FAILURE
} from './types';

export const setProjectId = (project_id: string) => {
    return {
        type: SET_PROJECT_ID,
        project_id: project_id
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
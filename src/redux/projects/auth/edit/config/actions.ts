import axios, { AxiosResponse } from 'axios';
import { MAIN_URL } from '../../../../../globals';
import {
    FETCH_CONFIG_REQUEST,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE
} from './types';

export const fetchConfig = (project_id: string) => {
    return dispatch => {
        dispatch({
            type: FETCH_CONFIG_REQUEST
        });
        return axios.get(`${MAIN_URL}/api/projects/${project_id}/containers/auth/config`, { withCredentials: true })
            .then((res: AxiosResponse) => {
                if (res.data.config) {
                    dispatch({
                        type: FETCH_CONFIG_SUCCESS,
                        config: res.data.config
                    });
                } else {
                    dispatch({
                        type: FETCH_CONFIG_FAILURE,
                        error: 'No authentication config associated with this project.'
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_CONFIG_FAILURE,
                    error: err.response ? err.response.data.message : err.message
                });
            })
    }
}
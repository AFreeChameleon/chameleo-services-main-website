import axios, { AxiosResponse } from 'axios';
import { MAIN_URL } from '../../globals';
import {
    FETCH_CONTAINERS_REQUEST,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINERS_FAILURE
} from './types';

export const fetchContainers = () => {
    return dispatch => {
        dispatch({
            type: FETCH_CONTAINERS_REQUEST
        });
        return fetch(`${MAIN_URL}/api/containers`, { credentials: 'include' })
            .then((raw) => raw.json())
            .then((res) => {
                console.log(res)
                if (res.containers && res.containers.length) {
                    dispatch({
                        type: FETCH_CONTAINERS_SUCCESS,
                        containers: res.containers
                    });
                } else {
                    dispatch({
                        type: FETCH_CONTAINERS_FAILURE,
                        error: 'No containers.'
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_CONTAINERS_FAILURE,
                    error: err.response ? err.response.data.message : err.message
                });
            })
    }
}
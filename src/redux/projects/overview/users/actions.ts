import axios from 'axios';
import {
    FETCH_USER_LIST_REQUEST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAILURE
} from './types';

export const fetchUserList = (project_id: string) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_USER_LIST_REQUEST
        });
        // return axios.
    }
}
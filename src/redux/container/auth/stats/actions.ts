import axios from 'axios';
import { MAIN_URL } from '../../../../globals';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
} from './types';

export const fetchAllUsers = (container_id: string) => {
    return dispatch => {
        dispatch({
            type: FETCH_ALL_USERS_REQUEST
        });
        return axios.get(`${MAIN_URL}/api/container/auth/${container_id}/users/statistics`, { withCredentials: true })
        .then((res) => {
            if (res.data.users) {
                dispatch({
                    type: FETCH_ALL_USERS_SUCCESS,
                    users: res.data.users,
                    userCount: res.data.userCount,
                    activeUsers: res.data.activeUsers,
                    emails: res.data.emails,
                    emailCount: res.data.emailCount
                });
            } else {
                dispatch({
                    type: FETCH_ALL_USERS_FAILURE,
                    error: 'No users.'
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: FETCH_ALL_USERS_FAILURE,
                errors: err.response ? [err.response.data.message] : [err.message]
            });
        });
    }
}
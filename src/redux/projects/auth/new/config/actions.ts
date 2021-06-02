import axios, { AxiosResponse } from 'axios';
import { MAIN_URL } from '../../../../../globals';
import {
    SET_CONFIG_ERRORS,
    FETCH_CONFIG_REQUEST,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILURE,

    CHANGE_CONFIG_MODEL,
    CHANGE_CONFIG_MODEL_LENGTH,
    CHANGE_CONFIG_AUTH,
    CHANGE_CONFIG_AUTH_OAUTH,
    CHANGE_CONFIG_DB,
    CHANGE_CONFIG_PASS,
    CHANGE_CONFIG_MAIL,

    REMOVE_CONFIG_MODEL_ROW,
    ADD_CONFIG_MODEL_ROW,
    CHANGE_CONFIG_MODEL_TITLE,
    TOGGLE_CONFIG_AUTH_OAUTH
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

export const setConfigErrors = (errors: string[]) => {
    return {
        type: SET_CONFIG_ERRORS,
        errors: errors
    }
}

export const setConfigOAuthEnabled = (value: boolean) => {
    return {
        type: TOGGLE_CONFIG_AUTH_OAUTH,
        value: value
    }
}

export const changeConfigModel = (rowName: string, key: string, value) => {
    return {
        type: CHANGE_CONFIG_MODEL,
        rowName: rowName,
        key: key,
        value: value
    }
}

export const changeConfigModelLength = (rowName: string, key: string, value) => {
    return {
        type: CHANGE_CONFIG_MODEL_LENGTH,
        rowName: rowName,
        key: key,
        value: value
    }
}

export const changeConfigAuth = (key: string, value) => {
    return {
        type: CHANGE_CONFIG_AUTH,
        key: key,
        value: value
    }
}

export const changeConfigAuthOAuth = (company: string, key: string, value) => {
    return {
        type: CHANGE_CONFIG_AUTH_OAUTH,
        company: company,
        key: key,
        value: value
    }
}

export const changeConfigPass = (key: string, value) => {
    return {
        type: CHANGE_CONFIG_PASS,
        key: key,
        value: value
    }
}

export const changeConfigDB = (key: string, value) => {
    return {
        type: CHANGE_CONFIG_DB,
        key: key,
        value: value
    }
}

export const changeConfigMail = (key: string, value) => {
    return {
        type: CHANGE_CONFIG_MAIL,
        key: key,
        value: value
    }
}

export const removeConfigModelRow = (rowName: string) => {
    return {
        type: REMOVE_CONFIG_MODEL_ROW,
        rowName: rowName
    }
}

export const addConfigModelRow = () => {
    return {
        type: ADD_CONFIG_MODEL_ROW
    }
}

export const changeConfigModelTitle = (oldName: string, newName: string) => {
    return {
        type: CHANGE_CONFIG_MODEL_TITLE,
        oldName: oldName,
        newName: newName
    }
}
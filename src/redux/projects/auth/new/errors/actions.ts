import {
    PUSH_ERROR,
    REMOVE_ERROR,
    SET_ERRORS
} from './types';

export const pushError = (value) => {
    return {
        type: PUSH_ERROR,
        value: value
    }
}

export const removeError = (index) => {
    return {
        type: REMOVE_ERROR,
        index: index
    }
}

export const setErrors = (errors) => {
    return {
        type: SET_ERRORS,
        errors: errors
    }
}
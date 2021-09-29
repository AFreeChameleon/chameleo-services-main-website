import {
    ADD_ERROR_MESSAGE,
    REMOVE_ERROR_MESSAGE,
    SET_ERROR_MESSAGES,
    SET_ERROR_OPEN
} from './types';

export const addErrorMessage = (value: string) => ({
    type: ADD_ERROR_MESSAGE,
    value: value
});

export const removeErrorMessage = (value: string) => ({
    type: REMOVE_ERROR_MESSAGE,
    value: value
});

export const setErrorMessages = (values: string[]) => ({
    type: SET_ERROR_MESSAGES,
    values: values
});

export const setErrorOpen = (value: boolean) => ({
    type: SET_ERROR_OPEN,
    value: value
})
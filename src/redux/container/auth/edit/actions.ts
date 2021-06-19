import {
    SET_CONTAINER,
    SET_NAME,
    SET_TIER,
    SET_CONTAINER_CONFIG_MODEL,
    SET_CONTAINER_CONFIG_MODEL_LENGTH,
    REMOVE_CONTAINER_CONFIG_MODEL_ROW,
    ADD_CONTAINER_CONFIG_MODEL_ROW
} from './types';

export const setContainer = (container: { name: string, tier: string, config: any }) => ({
    type: SET_CONTAINER,
    container
})

export const setContainerName = (value: string) => ({
    type: SET_NAME,
    value
});

export const setContainerTier = (value: string) => ({
    type: SET_TIER,
    value
});

export const setContainerConfigModel = (rowName: string, key: string, value: any) => ({
    type: SET_CONTAINER_CONFIG_MODEL,
    rowName,
    key,
    value
});

export const setContainerConfigModelLength = (rowName: string, key: string, value: any) => ({
    type: SET_CONTAINER_CONFIG_MODEL_LENGTH,
    rowName,
    key,
    value
});

export const removeConfigModelRow = (rowName: string) => {
    return {
        type: REMOVE_CONTAINER_CONFIG_MODEL_ROW,
        rowName: rowName
    }
}

export const addConfigModelRow = () => {
    return {
        type: ADD_CONTAINER_CONFIG_MODEL_ROW
    }
}
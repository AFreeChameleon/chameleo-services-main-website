import {
    SET_CONTAINER,
    SET_NAME,
    SET_TIER,
    SET_CONTAINER_CONFIG_MODEL
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

export const setContainerConfigModel = (row_name: string, key: string, value: any) => ({
    type: SET_CONTAINER_CONFIG_MODEL,
    row_name,
    key,
    value
})
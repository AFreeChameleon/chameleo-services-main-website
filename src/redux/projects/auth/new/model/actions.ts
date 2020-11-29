import {
    MODEL_ADD_ROW,
    MODEL_REMOVE_ROW,
    MODEL_SET_ROW_VALUE
} from './types';

export const modelAddRow = (value) => {
    return {
        type: MODEL_ADD_ROW,
        value: value
    }
}

export const modelRemoveRow = (index: number) => {
    return {
        type: MODEL_REMOVE_ROW,
        index: index
    }
}

export const modelSetRow = (index: number, key: string, value) => {
    return {
        type: MODEL_SET_ROW_VALUE,
        index: index,
        key: key,
        value: value
    }
}
import {
    MODEL_ADD_ROW,
    MODEL_REMOVE_ROW,
    MODEL_SET_ROW_VALUE
} from './types';

const modelState = {
    table: [
        {
            name: 'username',
            unique: false,
            required: true,
            default: '',
            type: 'Username',
            max: 250,
            min: 3
        },
        {
            name: 'email',
            unique: true,
            required: true,
            default: '',
            type: 'Email',
            max: 250,
            min: 3
        },
        {
            name: 'name',
            unique: false,
            required: false,
            default: 'John Doe',
            type: 'String',
            max: 250,
            min: 3
        },
        {
            name: 'password',
            unique: false,
            required: true,
            default: '',
            type: 'Password',
            max: 250,
            min: 3
        }
    ]
}

const modelReducer = (state = modelState, action) => {
    switch(action.type) {
        case MODEL_ADD_ROW:
            return {
                ...state,
                table: [
                    ...state.table,
                    ...action.value
                ]
            }
        case MODEL_REMOVE_ROW:
            state.table.splice(action.index, 1);
            return {
                ...state,
                table: [
                    ...state.table
                ]
            }
        case MODEL_SET_ROW_VALUE:
            state.table[action.index][action.key] = action.value;
            return {
                ...state,
                table: [
                    ...state.table
                ]
            }

        default:
            return state;
    }
}

export default modelReducer;
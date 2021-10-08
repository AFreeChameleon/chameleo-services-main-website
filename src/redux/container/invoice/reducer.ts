import {
    FETCH_CONTAINER_INVOICES_REQUEST,
    FETCH_CONTAINER_INVOICES_SUCCESS,
    FETCH_CONTAINER_INVOICES_FAILURE
} from './types';

const defaultState = {
    data: [],
    errors: [],
    loading: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CONTAINER_INVOICES_REQUEST:
            return {
                ...state,
                errors: [],
                loading: true
            }
        case FETCH_CONTAINER_INVOICES_SUCCESS:
            return {
                ...state,
                data: action.value,
                loading: false 
            }
        case FETCH_CONTAINER_INVOICES_FAILURE:
            return {
                ...state,
                errors: action.value,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;
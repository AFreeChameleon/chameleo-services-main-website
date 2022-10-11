import { 
    FETCH_CONTAINERS_FAILURE, 
    FETCH_CONTAINERS_REQUEST, 
    FETCH_CONTAINERS_SUCCESS 
} from './types';

const defaultState = {
    loading: false,
    containers: [],
    error: ''
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case FETCH_CONTAINERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CONTAINERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                containers: action.containers
            }
        case FETCH_CONTAINERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case '':

        default:
            return state;
    }
}

export default reducer;
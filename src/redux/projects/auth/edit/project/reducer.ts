import {
    SET_PROJECT_VALUE
} from './types';

const projectState = {
    project_id: ''
}

const projectReducer = (state = projectState, action) => {
    switch (action.type) {
        case SET_PROJECT_VALUE:
            return {
                ...state,
                project_id: action.value
            }
        default:
            return state;
    }
}

export default projectReducer;
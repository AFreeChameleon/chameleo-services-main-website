import { combineReducers } from 'redux';
import containerReducer from './container/rootReducer';
import containersReducer from './container/reducer';

const rootReducer = combineReducers({
    container: containerReducer,
    containers: containersReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import containerReducer from './container/rootReducer';
import containersReducer from './container/reducer';
import errorsReducer from './errors/reducer';

const rootReducer = combineReducers({
    container: containerReducer,
    containers: containersReducer,
    errors: errorsReducer
});

export default rootReducer;
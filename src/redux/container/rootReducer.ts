import { combineReducers } from 'redux';
import authReducer from './auth/rootReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
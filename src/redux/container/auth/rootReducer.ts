import { combineReducers } from 'redux';
import configReducer from './config/reducer';
import editReducer from './edit/reducer';

const rootReducer = combineReducers({
    config: configReducer,
    edit: editReducer
});

export default rootReducer;
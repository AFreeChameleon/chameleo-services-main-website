import { combineReducers } from 'redux';
import projectReducer from './project/reducer';
import configReducer from './config/reducer';

const rootReducer = combineReducers({
    project: projectReducer,
    config: configReducer
});

export default rootReducer;
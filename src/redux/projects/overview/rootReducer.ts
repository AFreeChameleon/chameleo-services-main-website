import { combineReducers } from 'redux';
import tabReducer from './tabs/reducer';
import projectReducer from './project/reducer';

const rootReducer = combineReducers({
    tabs: tabReducer,
    project: projectReducer
});

export default rootReducer;
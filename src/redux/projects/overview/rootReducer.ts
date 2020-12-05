import { combineReducers } from 'redux';
import tabReducer from './tabs/reducer';

const rootReducer = combineReducers({
    tabs: tabReducer
});

export default rootReducer;
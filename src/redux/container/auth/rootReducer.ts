import { combineReducers } from 'redux';
import configReducer from './config/reducer';
import editReducer from './edit/reducer';
import statsReducer from './stats/reducer';

const rootReducer = combineReducers({
    config: configReducer,
    edit: editReducer,
    stats: statsReducer,
});

export default rootReducer;
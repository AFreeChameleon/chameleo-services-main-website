import { combineReducers } from 'redux';
import mailReducer from './mail/reducer';
import passwordReducer from './password/reducer';
import settingsReducer from './settings/reducer';
import modelReducer from './model/reducer';
import oauthReducer from './oauth/reducer';
import errorReducer from './errors/reducer';
import tabsReducer from './tabs/reducer';

const rootReducer = combineReducers({
    mail: mailReducer,
    password: passwordReducer,
    settings: settingsReducer,
    model: modelReducer,
    oauth: oauthReducer,
    errors: errorReducer,
    tabs: tabsReducer
});

export default rootReducer;
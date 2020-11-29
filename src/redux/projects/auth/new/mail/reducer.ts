import {
    MAIL_SET_VALUE
} from './types';

const mailState = {
    enabled: true,
    fromAddress: '',
    verificationType: 'link',

    verifySubject: 'Verify your email!',
    verifyContent: 'Verify your email by clicking this link: {__verify__}',

    resetSubject: 'Your password has been reset!',
    resetContent: 'Your password has been reset to: {__temporary password__}'
}

const mailReducer = (state = mailState, action) => {
    switch(action.type) {
        case MAIL_SET_VALUE:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state;
    }
}

export default mailReducer;
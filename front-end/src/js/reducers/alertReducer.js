import { alertTypes } from '../constants';

const defaultState = {
    open: false,
    type: alertTypes.success,
    message: '',
    displayTime: 5000,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'DISPLAY_ALERT':
            return {
                ...state,
                open: true,
                type: action.payload.type,
                message: action.payload.message,
                displayTime: action.payload.displayTime,
            };
        case 'HIDE_ALERT':
            return {
                ...state,
                open: false,
            };

        default:
            return state;
    }
};

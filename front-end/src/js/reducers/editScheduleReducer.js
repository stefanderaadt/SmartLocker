import moment from 'moment';

const defaultState = {
    id: null,
    dateFrom: moment().valueOf(),
    dateTo: moment()
        .add(10, 'minutes')
        .valueOf(),
    userId: '',
    smartLockerId: '',
    dialogOpen: false,
    saving: false,
    saved: false,
    deleting: false,
    deleted: false,
    errors: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_SCHEDULE_VALUES':
            return {
                ...state,
                ...action.payload,
            };
        case 'OPEN_EDIT_SCHEDULE_DIALOG':
            return {
                ...state,
                userId: action.payload,
                dialogOpen: true,
                id: null,
            };
        case 'OPEN_EDIT_SCHEDULE_DIALOG_UPDATE':
            return {
                ...state,
                ...action.payload,
                dialogOpen: true,
            };
        case 'CLOSE_EDIT_SCHEDULE_DIALOG':
            return {
                ...state,
                ...defaultState,
            };
        case 'SAVE_SCHEDULE':
            return {
                ...state,
                saving: true,
                saved: false,
            };
        case 'SAVE_SCHEDULE_DONE':
            return {
                ...defaultState,
                saved: true,
            };
        case 'SAVE_SCHEDULE_ERROR':
            return {
                ...state,
                saving: false,
                saved: false,
                errors: action.payload,
            };
        case 'DELETE_SCHEDULE':
            return {
                ...state,
                deleting: true,
                deleted: false,
            };
        case 'DELETE_SCHEDULE_DONE':
            return {
                ...defaultState,
                deleted: true,
            };
        case 'DELETE_SCHEDULE_ERROR':
            return {
                ...state,
                deleting: false,
                deleted: false,
                errors: action.payload,
            };
        default:
            return state;
    }
};

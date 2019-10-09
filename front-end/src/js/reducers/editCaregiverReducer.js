const defaultState = {
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    groupId: '',
    dialogOpen: false,
    saving: false,
    saved: false,
    deleting: false,
    deleted: false,
    errors: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_CAREGIVER_VALUES':
            return {
                ...state,
                ...action.payload,
            };
        case 'OPEN_EDIT_CAREGIVER_DIALOG':
            return {
                ...state,
                dialogOpen: true,
                id: null,
            };
        case 'OPEN_EDIT_CAREGIVER_DIALOG_UPDATE':
            return {
                ...state,
                ...action.payload,
                dialogOpen: true,
            };
        case 'CLOSE_EDIT_CAREGIVER_DIALOG':
            return {
                ...state,
                ...defaultState,
            };
        case 'SAVE_CAREGIVER':
            return {
                ...state,
                saving: true,
                saved: false,
            };
        case 'SAVE_CAREGIVER_DONE':
            return {
                ...defaultState,
                saved: true,
            };
        case 'SAVE_CAREGIVER_ERROR':
            return {
                ...state,
                saving: false,
                saved: false,
                errors: action.payload,
            };
        case 'DELETE_CAREGIVER':
            return {
                ...state,
                deleting: true,
                deleted: false,
            };
        case 'DELETE_CAREGIVER_DONE':
            return {
                ...defaultState,
                deleted: true,
            };
        case 'DELETE_CAREGIVER_ERROR':
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

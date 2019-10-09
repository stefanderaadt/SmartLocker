const defaultState = {
    id: null,
    patient: {
        firstName: '',
        lastName: '',
    },
    address: {
        street: '',
        streetNumber: '',
        city: '',
        postalCode: '',
    },
    dialogOpen: false,
    saving: false,
    saved: false,
    deleting: false,
    deleted: false,
    errors: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_SMART_LOCKER_PATIENT_VALUES':
            return {
                ...state,
                patient: {
                    ...state.patient,
                    ...action.payload,
                },
            };
        case 'UPDATE_SMART_LOCKER_ADDRESS_VALUES':
            return {
                ...state,
                address: {
                    ...state.address,
                    ...action.payload,
                },
            };
        case 'OPEN_EDIT_SMART_LOCKER_DIALOG':
            return {
                ...state,
                dialogOpen: true,
                id: null,
            };
        case 'OPEN_EDIT_SMART_LOCKER_DIALOG_UPDATE':
            return {
                ...state,
                ...action.payload,
                dialogOpen: true,
            };
        case 'CLOSE_EDIT_SMART_LOCKER_DIALOG':
            return {
                ...state,
                ...defaultState,
            };
        case 'SAVE_SMART_LOCKER':
            return {
                ...state,
                saving: true,
                saved: false,
            };
        case 'SAVE_SMART_LOCKER_DONE':
            return {
                ...defaultState,
                saved: true,
            };
        case 'SAVE_SMART_LOCKER_ERROR':
            return {
                ...state,
                saving: false,
                saved: false,
                errors: action.payload,
            };
        case 'DELETE_SMART_LOCKER':
            return {
                ...state,
                deleting: true,
                deleted: false,
            };
        case 'DELETE_SMART_LOCKER_DONE':
            return {
                ...defaultState,
                deleted: true,
            };
        case 'DELETE_SMART_LOCKER_ERROR':
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

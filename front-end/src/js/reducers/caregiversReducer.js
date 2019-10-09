import { sortTypes } from '../constants';

const defaultState = {
    fetched: false,
    fetching: false,
    content: [],
    first: false,
    last: false,
    number: 0,
    numberOfElements: 0,
    size: 10,
    sortField: '',
    sortDirection: sortTypes.asc,
    sort: null,
    totalElements: 0,
    totalPages: 0,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_CAREGIVERS':
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case 'FETCH_CAREGIVERS_DONE':
            return {
                ...state,
                fetching: false,
                fetched: true,
                ...action.payload,
            };
        case 'FETCH_CAREGIVERS_ERROR':
            return {
                ...state,
                fetching: false,
                fetched: false,
            };
        case 'CAREGIVERS_UPDATE_SEARCH_VALUES':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

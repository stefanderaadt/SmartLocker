import { sortTypes } from '../constants';
import moment from 'moment';

const defaultState = {
    fetchedCaregiver: false,
    fetchingCaregiver: false,
    userId: '',
    caregiver: {},
    fetchedCaregiverSchedules: false,
    fetchingCaregiverSchedules: false,
    schedules: [],
    date: moment(),
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_CAREGIVER':
            return {
                ...state,
                fetchingCaregiver: true,
                fetchedCaregiver: false,
            };
        case 'FETCH_CAREGIVER_DONE':
            return {
                ...state,
                fetchingCaregiver: false,
                fetchedCaregiver: true,
                caregiver: action.payload,
            };
        case 'FETCH_CAREGIVER_ERROR':
            return {
                ...state,
                fetchingCaregiver: false,
                fetchedCaregiver: false,
            };
        case 'FETCH_CAREGIVER_SCHEDULES':
            return {
                ...state,
                fetchingCaregiverSchedules: true,
                fetchedCaregiverSchedules: false,
            };
        case 'FETCH_CAREGIVER_SCHEDULES_DONE':
            return {
                ...state,
                fetchingCaregiverSchedules: false,
                fetchedCaregiverSchedules: true,
                schedules: action.payload,
            };
        case 'FETCH_CAREGIVER_SCHEDULES_ERROR':
            return {
                ...state,
                fetchingCaregiverSchedules: false,
                fetchedCaregiverSchedules: false,
            };
        case 'CAREGIVER_SET_USER_ID':
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
};

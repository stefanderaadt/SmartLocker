import superagent from 'superagent';

import { displayErrorAlert } from './alertActions';

import store from '../store';
import settings from '../settings';
import moment from 'moment';

function startFetchCaregiver() {
    return { type: 'FETCH_CAREGIVER' };
}

function fetchCaregiverDone(caregiver) {
    return { type: 'FETCH_CAREGIVER_DONE', payload: caregiver };
}

function fetchCaregiverError() {
    return { type: 'FETCH_CAREGIVER_ERROR' };
}

export function fetchCaregiver() {
    return function(dispatch) {
        const { login, caregiver } = store.getState();

        dispatch(startFetchCaregiver());

        superagent
            .get(`${settings.api_url}caregivers/${caregiver.userId}`)
            .set('Authorization', login.token)
            .then(res => {
                dispatch(fetchCaregiverDone(res.body));
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(fetchCaregiverError());
            });
    };
}

function startFetchCaregiverSchedules() {
    return { type: 'FETCH_CAREGIVER_SCHEDULES' };
}

function fetchCaregiverSchedulesDone(caregiver) {
    return { type: 'FETCH_CAREGIVER_SCHEDULES_DONE', payload: caregiver };
}

function fetchCaregiverSchedulesError() {
    return { type: 'FETCH_CAREGIVER_SCHEDULES_ERROR' };
}

export function fetchCaregiverSchedules() {
    return function(dispatch) {
        const { login, caregiver } = store.getState();

        dispatch(startFetchCaregiverSchedules());

        superagent
            .get(`${settings.api_url}schedules/get-by-week`)
            .query({
                userid: caregiver.userId,
                year: caregiver.date.year(),
                week: caregiver.date.week(),
            })
            .set('Authorization', login.token)
            .then(res => {
                dispatch(
                    fetchCaregiverSchedulesDone(
                        res.body.map(schedule => ({
                            ...schedule,
                            dateFrom: moment(schedule.dateFrom),
                            dateTo: moment(schedule.dateTo),
                        }))
                    )
                );
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(fetchCaregiverSchedulesError());
            });
    };
}

export function caregiverSetUserId(userId) {
    return { type: 'CAREGIVER_SET_USER_ID', payload: userId };
}

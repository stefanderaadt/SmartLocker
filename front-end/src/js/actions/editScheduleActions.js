import superagent from 'superagent';

import { displayErrorAlert, displaySuccessAlert } from './alertActions';

import store from '../store';
import settings from '../settings';

import { fetchCaregiverSchedules } from './caregiverActions';

function startSaveSchedule() {
    return { type: 'SAVE_SCHEDULE' };
}

function saveScheduleSuccess() {
    return function(dispatch) {
        dispatch(fetchCaregiverSchedules());
        dispatch(saveScheduleDone());
    };
}

function saveScheduleDone() {
    return { type: 'SAVE_SCHEDULE_DONE' };
}

function saveScheduleError({ errors, errorCode }) {
    let message = 'Er is iets fout gegaan met de connectie naar de server.';

    if (errorCode === 400) {
        message = 'Niet alle velden zijn juist ingevuld.';
    }

    return function(dispatch) {
        dispatch(
            displayErrorAlert({
                message,
            })
        );
        dispatch(saveScheduleErrors(errors));
    };
}

function saveScheduleErrors(errors) {
    return { type: 'SAVE_SCHEDULE_ERROR', payload: errors };
}

export function saveSchedule(schedule) {
    return function(dispatch) {
        const { login, caregiver } = store.getState();

        const { smartLockerId, ...scheduleProps } = schedule;
        const newSchedule = {
            ...scheduleProps,
            smartLockerId: smartLockerId.value,
            userId: caregiver.userId,
        };

        if (schedule.dateFrom > schedule.dateTo) {
            dispatch(
                saveScheduleError({
                    errors: [
                        {
                            defaultMessage:
                                'Datum/Tijd van kan niet hoger zijn dan Datum/Tijd tot',
                            field: 'dateFrom',
                        },
                        {
                            defaultMessage:
                                'Datum/Tijd van kan niet hoger zijn dan Datum/Tijd tot',
                            field: 'dateTo',
                        },
                    ],
                    errorCode: 400,
                })
            );
            return;
        }

        if (schedule.id) {
            superagent
                .put(`${settings.api_url}schedules`)
                .send(newSchedule)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({ message: 'Planning aangepast.' })
                    );
                    dispatch(saveScheduleSuccess());
                })
                .catch(err => {
                    dispatch(
                        saveScheduleError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        } else {
            superagent
                .post(`${settings.api_url}schedules`)
                .send(newSchedule)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({ message: 'Planning aangemaakt.' })
                    );
                    dispatch(saveScheduleSuccess());
                })
                .catch(err => {
                    dispatch(
                        saveScheduleError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        }
    };
}

function startDeleteSchedule() {
    return { type: 'DELETE_SCHEDULE' };
}

function deleteScheduleSuccess() {
    return function(dispatch) {
        dispatch(fetchCaregiverSchedules());
        dispatch(deleteScheduleDone());
    };
}

function deleteScheduleDone() {
    return { type: 'DELETE_SCHEDULE_DONE' };
}

function deleteScheduleError(errors) {
    return { type: 'DELETE_SCHEDULE_ERROR', payload: errors };
}

export function deleteSchedule(id) {
    return function(dispatch) {
        const { login } = store.getState();

        dispatch(startDeleteSchedule());
        superagent
            .delete(`${settings.api_url}schedules/${id}`)
            .set('Authorization', login.token)
            .then(res => {
                dispatch(
                    displaySuccessAlert({
                        message: 'Planning verwijderd.',
                    })
                );
                dispatch(deleteScheduleSuccess());
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(deleteScheduleError(err.response.body.errors));
            });
    };
}

export function updateScheduleValues(values) {
    return { type: 'UPDATE_SCHEDULE_VALUES', payload: values };
}

export function openEditScheduleDialog(scheduleId) {
    return { type: 'OPEN_EDIT_SCHEDULE_DIALOG', payload: scheduleId };
}

export function openEditScheduleDialogUpdate(schedule) {
    const scheduleToUpdate = {
        id: schedule.id,
        dateFrom: schedule.dateFrom.valueOf(),
        dateTo: schedule.dateTo.valueOf(),
        smartLockerId: {
            value: schedule.smartLocker.id,
            label: `${schedule.smartLocker.patient.firstName} ${
                schedule.smartLocker.patient.lastName
            } - ${schedule.smartLocker.address.postalCode} ${
                schedule.smartLocker.address.street
            } ${schedule.smartLocker.address.streetNumber} ${
                schedule.smartLocker.address.city
            }`,
        },
    };

    return {
        type: 'OPEN_EDIT_SCHEDULE_DIALOG_UPDATE',
        payload: scheduleToUpdate,
    };
}

export function closeEditScheduleDialog() {
    return { type: 'CLOSE_EDIT_SCHEDULE_DIALOG' };
}

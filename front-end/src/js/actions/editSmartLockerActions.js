import superagent from 'superagent';

import { displayErrorAlert, displaySuccessAlert } from './alertActions';

import store from '../store';
import settings from '../settings';

import { fetchSmartLockers } from './smartLockersActions';

function startSaveSmartLocker() {
    return { type: 'SAVE_SMART_LOCKER' };
}

function saveSmartLockerSuccess() {
    return function(dispatch) {
        dispatch(fetchSmartLockers());
        dispatch(saveSmartLockerDone());
    };
}

function saveSmartLockerDone() {
    return { type: 'SAVE_SMART_LOCKER_DONE' };
}

function saveSmartLockerError({ errors, errorCode }) {
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
        dispatch(saveSmartLockerErrors(errors));
    };
}

function saveSmartLockerErrors(errors) {
    return { type: 'SAVE_SMART_LOCKER_ERROR', payload: errors };
}

export function saveSmartLocker(smartLocker) {
    return function(dispatch) {
        const { login } = store.getState();

        dispatch(startSaveSmartLocker());

        if (smartLocker.id) {
            superagent
                .put(`${settings.api_url}smartlockers`)
                .send(smartLocker)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({
                            message: 'SmartLocker opgeslagen.',
                        })
                    );
                    dispatch(saveSmartLockerSuccess());
                })
                .catch(err => {
                    console.log(err.response);
                    dispatch(
                        saveSmartLockerError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        } else {
            superagent
                .post(`${settings.api_url}smartlockers`)
                .send(smartLocker)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({
                            message: 'SmartLocker opgeslagen.',
                        })
                    );
                    dispatch(saveSmartLockerSuccess());
                })
                .catch(err => {
                    dispatch(
                        saveSmartLockerError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        }
    };
}

function startDeleteSmartLocker() {
    return { type: 'DELETE_SMART_LOCKER' };
}

function deleteSmartLockerSuccess() {
    return function(dispatch) {
        dispatch(fetchSmartLockers());
        dispatch(deleteSmartLockerDone());
    };
}

function deleteSmartLockerDone() {
    return { type: 'DELETE_SMART_LOCKER_DONE' };
}

function deleteSmartLockerError(errors) {
    return { type: 'DELETE_SMART_LOCKER_ERROR', payload: errors };
}

export function deleteSmartLocker(id) {
    return function(dispatch) {
        const { login } = store.getState();

        dispatch(startDeleteSmartLocker());
        superagent
            .delete(`${settings.api_url}smartlockers/${id}`)
            .set('Authorization', login.token)
            .then(res => {
                dispatch(
                    displaySuccessAlert({
                        message: 'SmartLocker verwijderd.',
                    })
                );
                dispatch(deleteSmartLockerSuccess());
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(deleteSmartLockerError(err.response.body.errors));
            });
    };
}

export function updateSmartLockerPatientValues(values) {
    return { type: 'UPDATE_SMART_LOCKER_PATIENT_VALUES', payload: values };
}

export function updateSmartLockerAddressValues(values) {
    return { type: 'UPDATE_SMART_LOCKER_ADDRESS_VALUES', payload: values };
}

export function openEditSmartLockerDialog() {
    return { type: 'OPEN_EDIT_SMART_LOCKER_DIALOG' };
}

export function openEditSmartLockerDialogUpdate(smartLocker) {
    return {
        type: 'OPEN_EDIT_SMART_LOCKER_DIALOG_UPDATE',
        payload: smartLocker,
    };
}

export function closeEditSmartLockerDialog() {
    return { type: 'CLOSE_EDIT_SMART_LOCKER_DIALOG' };
}

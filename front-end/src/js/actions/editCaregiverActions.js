import superagent from 'superagent';

import { displayErrorAlert, displaySuccessAlert } from './alertActions';

import store from '../store';
import settings from '../settings';

import { fetchCaregivers } from './caregiversActions';

function startSaveCaregiver() {
    return { type: 'SAVE_CAREGIVER' };
}

function saveCaregiverSuccess() {
    return function(dispatch) {
        dispatch(fetchCaregivers());
        dispatch(saveCaregiverDone());
    };
}

function saveCaregiverDone() {
    return { type: 'SAVE_CAREGIVER_DONE' };
}

function saveCaregiverError({ errors, errorCode }) {
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
        dispatch(saveCaregiverErrors(errors));
    };
}

function saveCaregiverErrors(errors) {
    return { type: 'SAVE_CAREGIVER_ERROR', payload: errors };
}

export function saveCaregiver(caregiver) {
    return function(dispatch) {
        const { login } = store.getState();

        dispatch(startSaveCaregiver());

        if (caregiver.id) {
            superagent
                .put(`${settings.api_url}caregivers`)
                .send(caregiver)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({
                            message: 'Verzorger opgeslagen.',
                        })
                    );
                    dispatch(saveCaregiverSuccess());
                })
                .catch(err => {
                    dispatch(
                        saveCaregiverError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        } else {
            superagent
                .post(`${settings.api_url}caregivers`)
                .send(caregiver)
                .set('Authorization', login.token)
                .then(res => {
                    dispatch(
                        displaySuccessAlert({
                            message: 'Verzorger opgeslagen.',
                        })
                    );
                    dispatch(saveCaregiverSuccess());
                })
                .catch(err => {
                    dispatch(
                        saveCaregiverError({
                            errors: err.response.body.errors,
                            errorCode: err.response.body.status,
                        })
                    );
                });
        }
    };
}

function startDeleteCaregiver() {
    return { type: 'DELETE_CAREGIVER' };
}

function deleteCaregiverSuccess() {
    return function(dispatch) {
        dispatch(fetchCaregivers());
        dispatch(deleteCaregiverDone());
    };
}

function deleteCaregiverDone() {
    return { type: 'DELETE_CAREGIVER_DONE' };
}

function deleteCaregiverError(errors) {
    return { type: 'DELETE_CAREGIVER_ERROR', payload: errors };
}

export function deleteCaregiver(id) {
    return function(dispatch) {
        const { login } = store.getState();

        dispatch(startDeleteCaregiver());
        superagent
            .delete(`${settings.api_url}caregivers/${id}`)
            .set('Authorization', login.token)
            .then(res => {
                dispatch(
                    displaySuccessAlert({
                        message: 'Verzorger verwijderd.',
                    })
                );
                dispatch(deleteCaregiverSuccess());
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(deleteCaregiverError(err.response.body.errors));
            });
    };
}

export function updateCaregiverValues(values) {
    return { type: 'UPDATE_CAREGIVER_VALUES', payload: values };
}

export function openEditCaregiverDialog() {
    return { type: 'OPEN_EDIT_CAREGIVER_DIALOG' };
}

export function openEditCaregiverDialogUpdate(caregiver) {
    return { type: 'OPEN_EDIT_CAREGIVER_DIALOG_UPDATE', payload: caregiver };
}

export function closeEditCaregiverDialog() {
    return { type: 'CLOSE_EDIT_CAREGIVER_DIALOG' };
}

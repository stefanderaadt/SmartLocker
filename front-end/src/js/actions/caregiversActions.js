import superagent from 'superagent';

import { displayErrorAlert } from './alertActions';

import store from '../store';
import settings from '../settings';

function startFetchCaregivers() {
    return { type: 'FETCH_CAREGIVERS' };
}

function fetchCaregiversDone(caregivers) {
    return { type: 'FETCH_CAREGIVERS_DONE', payload: caregivers };
}

function fetchCaregiversError() {
    return { type: 'FETCH_CAREGIVERS_ERROR' };
}

export function fetchCaregivers() {
    return function(dispatch) {
        const { login, caregivers } = store.getState();

        dispatch(startFetchCaregivers());

        superagent
            .get(`${settings.api_url}caregivers`)
            .query({
                page: caregivers.number,
                size: caregivers.size,
                sort: caregivers.sortField,
                sortDirection: caregivers.sortDirection,
            })
            .set('Authorization', login.token)
            .then(res => {
                dispatch(fetchCaregiversDone(res.body));
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(fetchCaregiversError());
            });
    };
}

export function caregiversUpdateSearchValues(values) {
    return { type: 'CAREGIVERS_UPDATE_SEARCH_VALUES', payload: values };
}

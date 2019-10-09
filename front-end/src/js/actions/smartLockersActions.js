import superagent from 'superagent';

import { displayErrorAlert, displaySuccessAlert } from './alertActions';

import store from '../store';
import settings from '../settings';

function startFetchSmartLockers() {
    return { type: 'FETCH_SMART_LOCKERS' };
}

function fetchSmartLockersDone(smartLockers) {
    return { type: 'FETCH_SMART_LOCKERS_DONE', payload: smartLockers };
}

function fetchSmartLockersError() {
    return { type: 'FETCH_SMART_LOCKERS_ERROR' };
}

export function fetchSmartLockers() {
    return function(dispatch) {
        const { login, smartLockers } = store.getState();

        dispatch(startFetchSmartLockers());

        superagent
            .get(`${settings.api_url}smartlockers`)
            .query({
                page: smartLockers.number,
                size: smartLockers.size,
                sort: smartLockers.sortField,
                sortDirection: smartLockers.sortDirection,
            })
            .set('Authorization', login.token)
            .then(res => {
                dispatch(fetchSmartLockersDone(res.body));
            })
            .catch(err => {
                dispatch(
                    displayErrorAlert({
                        message:
                            'Er is iets fout gegaan met de connectie naar de server.',
                    })
                );
                dispatch(fetchSmartLockersError());
            });
    };
}

export function smartLockersUpdateSearchValues(values) {
    return { type: 'SMART_LOCKERS_UPDATE_SEARCH_VALUES', payload: values };
}

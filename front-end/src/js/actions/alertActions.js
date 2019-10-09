import { alertTypes } from '../constants';

export function displayErrorAlert({ message, displayTime = 10000 }) {
    return {
        type: 'DISPLAY_ALERT',
        payload: { message, type: alertTypes.error, displayTime },
    };
}

export function displayWarningAlert({ message, displayTime = 10000 }) {
    return {
        type: 'DISPLAY_ALERT',
        payload: { message, type: alertTypes.warning, displayTime },
    };
}

export function displaySuccessAlert({ message, displayTime = 3000 }) {
    return {
        type: 'DISPLAY_ALERT',
        payload: { message, type: alertTypes.success, displayTime },
    };
}

export function hideAlert() {
    return { type: 'HIDE_ALERT' };
}

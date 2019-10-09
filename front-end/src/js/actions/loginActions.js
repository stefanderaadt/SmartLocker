import superagent from 'superagent';

import { displayErrorAlert } from './alertActions';

import settings from '../settings';

function checkingLogin() {
    return { type: 'CHECKING_LOGIN' };
}

function checkingLoginError() {
    return { type: 'CHECKING_LOGIN_ERROR' };
}

function loggedIn(data) {
    return { type: 'LOGGED_IN', payload: data };
}

export function checkLogin() {
    return function(dispatch) {
        dispatch(checkingLogin());

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token) {
            superagent
                .get(`${settings.api_url}login/check`)
                .set('Authorization', token)
                .then(res => {
                    dispatch(loggedIn({ token, user }));
                })
                .catch(err => {
                    dispatch(checkingLoginError());
                });
        } else {
            dispatch(checkingLoginError());
        }
    };
}

export function setEmail(email) {
    return { type: 'SET_EMAIL', payload: email };
}

export function setPassword(password) {
    return { type: 'SET_PASSWORD', payload: password };
}

function loginStart() {
    return { type: 'LOGIN_START' };
}

function loginSuccess(token) {
    return { type: 'LOGIN_SUCCESS', payload: token };
}

function loginError(code) {
    return { type: 'LOGIN_ERROR', payload: code };
}

export function doLogin({ email, password }) {
    return function(dispatch) {
        dispatch(loginStart());

        superagent
            .post(`${settings.api_url}login`)
            .send({
                email,
                password,
            })
            .then(res => {
                const token = res.header.authorization;

                const user = { email };

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(loginSuccess({ token, user }));
            })
            .catch(err => {
                localStorage.clear('token');
                localStorage.clear('user');
                dispatch(
                    displayErrorAlert({
                        message: 'Gebruikersnaam of Wachtwoord is fout.',
                    })
                );
                dispatch(loginError(1));
            });
    };
}

export function doLogout() {
    localStorage.clear('token');
    localStorage.clear('user');

    return { type: 'DO_LOGOUT' };
}

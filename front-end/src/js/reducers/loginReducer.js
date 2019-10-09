const defaultState = {
    loggingIn: false,
    checkingLogin: false,
    loggedIn: false,
    loginError: -1,
    token: null,
    email: 'stefanderaadt@gmail.com',
    password: 'qwerty',
    user: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        // Check existing login token
        case 'CHECKING_LOGIN':
            return {
                ...state,
                checkingLogin: true,
            };
        case 'CHECKING_LOGIN_ERROR':
            return {
                ...state,
                checkingLogin: false,
            };
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn: true,
                checkingLogin: false,
                ...action.payload,
            };

        // Start new login session
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload,
            };
        case 'LOGIN_START':
            return {
                ...state,
                loggingIn: true,
                token: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                ...action.payload,
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload,
                token: null,
            };

        case 'DO_LOGOUT':
            return {
                ...state,
                ...defaultState,
            };
        default:
            return state;
    }
};

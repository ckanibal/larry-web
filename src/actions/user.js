export const USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLoginBegin = (payload) => ({
    type: USER_LOGIN_BEGIN,
    payload,
});

export const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    payload: {user}
});

export const userLoginFailure = error => ({
    type: USER_LOGIN_FAILURE,
    payload: {error}
});

export const userLogout = (payload) => ({
    type: USER_LOGOUT,
    payload,
});
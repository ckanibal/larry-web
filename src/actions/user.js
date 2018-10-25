export const USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_BEGIN = 'USER_LOGOUT_BEGIN';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_SETTINGS_SHOW = 'USER_SETTINGS_SHOW';

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

export const userLogoutBegin = (payload) => ({
    type: USER_LOGOUT_BEGIN,
    payload,
});

export const userLogoutSuccess = (payload) => ({
    type: USER_LOGOUT_SUCCESS,
    payload,
});

export const userSettingsShow = (payload) => ({
    type: USER_SETTINGS_SHOW,
    payload
});
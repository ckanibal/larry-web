import fetch from 'cross-fetch';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions';


async function userLoginApi({...args}) {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({...args}),
    });
    if (response.ok) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
}

async function userLogoutApi({...args}) {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/logout`, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({...args}),
    });
    if (response.ok) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
}

function* tryUserLogin({payload}) {
    try {
        const {user} = yield call(userLoginApi, payload);
        localStorage.setItem("user", JSON.stringify(user));
        yield put(actions.userLoginSuccess(user));
    } catch (err) {
        yield put(actions.userLoginFailure(err));
    }
}

function* tryUserLogout({payload}) {
    try {
        const response = yield call(userLogoutApi, payload);
        localStorage.removeItem('user');
        yield put(actions.userLogoutSuccess(response));
    } catch (err) {
        yield put(actions.errorsAddError(err));
    }
}

export function* loginSaga() {
    yield takeLatest(actions.USER_LOGIN_BEGIN, tryUserLogin);
}

export function* logoutSaga() {
    yield takeLatest(actions.USER_LOGOUT_BEGIN, tryUserLogout);
}
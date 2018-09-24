import fetch from 'cross-fetch';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from '../actions';


function userLoginApi({...args}) {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/`)
        .then(response => response.json());
}

function* tryUserLogin({payload}) {
    try {
        const user = yield call(userLoginApi, payload.user);
        yield put(actions.userLoginSuccess(user));
    } catch (err) {
        yield put(actions.userLoginFailure(err));
    }
}

export function* userSaga() {
    yield takeLatest(actions.USER_LOGIN_BEGIN, tryUserLogin);
}
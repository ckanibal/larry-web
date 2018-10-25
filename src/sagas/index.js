import { fork } from 'redux-saga/effects';
import { commentsSaga } from './commentsSaga';
import { uploadsSaga, uploadSaga } from './uploadsSaga';
import { loginSaga, logoutSaga, } from './userSaga';

export function* startup() {
}

export default function* root() {
    yield fork(startup);
    yield fork(commentsSaga);
    yield fork(uploadsSaga);
    yield fork(uploadSaga);
    yield fork(loginSaga);
    yield fork(logoutSaga);
}
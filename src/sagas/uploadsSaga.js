import fetch from 'cross-fetch';
import {takeLatest, put, call, all} from 'redux-saga/effects';
import * as actions from '../actions';


function fetchUploadsApi(...args) {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/uploads/`, {
        headers: {
            "Accept":
                "application/json; charset=utf-8",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json()
            }
        });
}

function* fetchUploads(...args) {
    try {
        const uploads = yield call(fetchUploadsApi, ...args);
        yield put(actions.uploadsFetchSuccess(uploads));
    } catch (error) {
        yield all([
            put(actions.uploadsFetchFailure(error)),
            put(actions.errorsAddError(error)),
        ]);
    }
}

export function* uploadsSaga() {
    yield takeLatest(actions.UPLOADS_FETCH_BEGIN, fetchUploads);
}


function fetchUploadApi({payload: {upload: {_id}}}) {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/uploads/${_id}`, {
        headers: {
            "Accept": "application/json; charset=utf-8",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json()
            }
        });
}

// Upload Detail View
function* fetchUpload(...args) {
    try {
        const upload = yield call(fetchUploadApi, ...args);
        yield put(actions.uploadFetchSuccess(upload));
    } catch (error) {
        yield all([
            put(actions.uploadFetchFailure(error)),
            put(actions.errorsAddError(error)),
        ])
    }
}

export function* uploadSaga() {
    yield takeLatest(actions.UPLOAD_FETCH_BEGIN, fetchUpload);
}
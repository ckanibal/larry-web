import fetch from 'cross-fetch';
import {delay} from 'redux-saga'
import {all, call, put, race, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions';


async function fetchUploadsApi(...args) {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/uploads/`, {
        credentials: "include",
        headers: {
            "Accept": "application/json",
        },
    });
    if (response.ok) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
}

function* fetchUploads(...args) {
    try {
        const {uploads} = yield race({
            uploads: call(fetchUploadsApi, ...args),
            timeout: call(delay, process.env.REACT_APP_API_TIMEOUT),
        });
        if (uploads) {
            yield put(actions.uploadsFetchSuccess(uploads));
        } else {
            throw new Error("API Timeout.");
        }
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

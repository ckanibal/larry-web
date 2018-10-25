import fetch from 'cross-fetch';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import * as actions from '../actions';


function fetchCommentsApi({_id, ...args}) {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/comments/?upload=${_id}`, {
        credentials: "include",
        mode: "cors",
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json()
            }
        });
}

function* fetchComments({payload}) {
    try {
        const {comments} = yield call(fetchCommentsApi, payload.upload);
        yield put(actions.commentsFetchSuccess(comments));
    } catch (err) {
        yield all([
            put(actions.commentsFetchFailure(err)),
            put(actions.errorsAddError(err)),
        ]);
    }
}

export function* commentsSaga() {
    yield takeLatest(actions.COMMENTS_FETCH_BEGIN, fetchComments);
}
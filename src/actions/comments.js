// Comments actions
export const COMMENTS_FETCH_BEGIN = 'COMMENTS_FETCH_BEGIN';
export const COMMENTS_FETCH_SUCCESS = 'COMMENTS_FETCH_SUCCESS';
export const COMMENTS_FETCH_FAILURE = 'COMMENTS_FETCH_FAILURE';

export const commentsFetchBegin = upload => ({
    type: COMMENTS_FETCH_BEGIN,
    payload: {upload},
});

export const commentsFetchSuccess = comments => ({
    type: COMMENTS_FETCH_SUCCESS,
    payload: {comments}
});

export const commentsFetchFailure = error => ({
    type: COMMENTS_FETCH_FAILURE,
    payload: {error}
});

// Uploads Actions
export const UPLOADS_FETCH_BEGIN = 'UPLOADS_FETCH_BEGIN';
export const UPLOADS_FETCH_SUCCESS = 'UPLOADS_FETCH_SUCCESS';
export const UPLOADS_FETCH_FAILURE = 'UPLOADS_FETCH_FAILURE';

export const uploadsFetchBegin = () => ({
    type: UPLOADS_FETCH_BEGIN
});

export const uploadsFetchSuccess = uploads => ({
    type: UPLOADS_FETCH_SUCCESS,
    payload: {uploads}
});

export const uploadsFetchFailure = error => ({
    type: UPLOADS_FETCH_FAILURE,
    payload: {error}
});


// Uploads Filters
export const UPLOADS_FILTER_ALL = 'UPLOADS_FILTER_ALL';
export const UPLOADS_FILTER_ADD = 'UPLOADS_FILTER_SET';
export const UPLOADS_FILTER_REMOVE = 'UPLOADS_FILTER_REMOVE';

export const uploadsFilterAll = () => ({
    type: UPLOADS_FILTER_ALL,
});

export const uploadsFilterAdd = ({filter}) => ({
    type: UPLOADS_FILTER_ADD,
    payload: {filter},
});

export const uploadsFilterRemove = ({filter}) => ({
    type: UPLOADS_FILTER_REMOVE,
    payload: {filter},
});


// Upload Actions
export const UPLOAD_FETCH_BEGIN = 'UPLOAD_FETCH_BEGIN';
export const UPLOAD_FETCH_SUCCESS = 'UPLOAD_FETCH_SUCCESS';
export const UPLOAD_FETCH_FAILURE = 'UPLOAD_FETCH_FAILURE';

export const uploadFetchBegin = upload => ({
   type: UPLOAD_FETCH_BEGIN,
   payload: {upload},
});

export const uploadFetchSuccess = upload => ({
    type: UPLOAD_FETCH_SUCCESS,
    payload: {upload},
});

export const uploadFetchFailure = error => ({
    type: UPLOAD_FETCH_FAILURE,
    payload: {error},
});

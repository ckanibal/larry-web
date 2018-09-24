import * as actions from '../actions';

const initialState = {
    items: [],
    detail: null,
};

const uploadReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.UPLOADS_FETCH_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
            };

        case actions.UPLOADS_FETCH_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                items: action.payload.uploads
            };

        case actions.UPLOADS_FETCH_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                error: action.payload.error,
            };
        case actions.UPLOAD_FETCH_BEGIN:
            return {
                ...state,
            };
        case actions.UPLOAD_FETCH_SUCCESS:
            return {
                ...state,
                detail: action.payload.upload,
            };
        case actions.UPLOAD_FETCH_FAILURE:
            return {
                ...state,
                detail: null,
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
};


export default uploadReducer;
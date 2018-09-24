import * as actions from '../actions';
import {LOCATION_CHANGE} from 'connected-react-router'

const initialState = {
    items: [],
};

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.COMMENTS_FETCH_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
            };

        case actions.COMMENTS_FETCH_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                items: action.payload.comments
            };

        case actions.COMMENTS_FETCH_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                error: action.payload.error,
            };
        case LOCATION_CHANGE: // clear errors on LocationChange
            return {
                ...state,
                items: [],
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
};


export default commentsReducer;
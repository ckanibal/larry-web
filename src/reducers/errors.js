import * as actions from '../actions';
import {LOCATION_CHANGE} from 'connected-react-router'

const initialState = {
    items: [],
};

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        // Add error to list
        case actions.ERRORS_ADD_ERROR:
            console.error(action.payload.error);
            return {
                ...state,
                items: [action.payload.error, ...state.items],
            };
        // Remove error(s) from list
        case actions.ERRORS_REMOVE_ERROR:
            return {
                ...state,
                items: state.items.filter(item => item !== action.payload.error),
            };
        // Clear Error List
        case actions.ERRORS_CLEAR: // fallthrough!
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


export default errorReducer;
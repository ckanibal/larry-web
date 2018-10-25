import * as actions from '../actions';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    current: user,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.USER_LOGIN_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                error: null,
            };

        case actions.USER_LOGIN_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                current: action.payload.user,
            };

        case actions.USER_LOGIN_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                error: action.payload.error,
                current: null,
            };

        case actions.USER_LOGOUT_BEGIN:
            return {
                ...state,
                error: null,
            };
        case actions.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                current: null,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
};


export default userReducer;
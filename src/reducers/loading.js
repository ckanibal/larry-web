const initialState = {};

const loadingReducer = (state = initialState, action) => {
    const matches = /(.*)_(BEGIN|SUCCESS|FAILURE)/.exec(action.type);

    // not a *_BEGIN / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState,
    };
};


export default loadingReducer;
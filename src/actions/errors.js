// Error Actions
export const ERRORS_ADD_ERROR = 'ERRORS_ADD_ERROR';
export const ERRORS_REMOVE_ERROR = 'ERRORS_REMOVE_ERROR';
export const ERRORS_CLEAR = 'ERRORS_CLEAR';

export const errorsAddError = error => ({
    type: ERRORS_ADD_ERROR,
    payload: {error},
});

export const errorsRemoveError = error => ({
    type: ERRORS_REMOVE_ERROR,
    payload: {error},
});

export const errorsClear = () => ({
    type: ERRORS_CLEAR,
});
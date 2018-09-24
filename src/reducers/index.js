import {combineReducers} from 'redux';
import comments from './comments';
import errors from './errors';
import loading from './loading';
import uploads from './uploads';
import user from './user';

export default combineReducers({
    comments,
    errors,
    loading,
    uploads,
    user,
});
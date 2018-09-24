import { connect } from 'react-redux'
import UploadList from '../components/UploadList'
import { VisibilityFilters, showUpload } from '../actions';

const getVisibleUploads = (uploads, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return uploads;
        case VisibilityFilters.SHOW_COMPLETED:
            return uploads.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return uploads.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
};

const mapStateToProps = state => ({
    uploads: getVisibleUploads(state.uploads, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
    onUploadClick: id => {
        dispatch(showUpload(id))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadList);
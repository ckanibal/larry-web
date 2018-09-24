import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchUploads } from "../actions/uploads";
import Spinner from "../components/Spinner";
import ErrorDisplay from "../components/ErrorDisplay";
import UploadList from "../components/UploadList";
import PropTypes from "prop-types";

class UploadDatasource extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUploads({}));
    }

    render() {
        const { error, loading, items } = this.props;

        if (error) {
            return <ErrorDisplay error={error} />;
        }

        if (loading) {
            return <Spinner />;
        }

        return (
            <UploadList data={items} onUploadClick={() => {}}/>
        );
    }
}

UploadDatasource.propTypes = {
};

const mapStateToProps = state => ({
    items: state.uploads.items,
    loading: state.uploads.loading,
    error: state.uploads.error
});

export default connect(mapStateToProps)(UploadDatasource);
import React, {Component} from "react";
import {connect} from "react-redux";

class DataSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploads: [],
            loading: true,
        }
    }

    getUploads = () => {
        return this.state.uploads;
    };

    render() {
        if (this.state.loading) {
            return (<div data-uk-spinner="ratio: 3"></div>);
        }
    }
}

const mapStateToProps = state => ({
    uploads: state.uploads,
    loading: state.loading,
    error: state.error
});

export default connect(mapStateToProps)(DataSource);
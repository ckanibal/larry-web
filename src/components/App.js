import React from 'react';
import {Route, Switch} from 'react-router'
import {push} from 'connected-react-router'
import {connect} from "react-redux";
import * as _ from 'lodash';

import * as actions from '../actions';
import {managedLifecycle} from '../containers/ManagedLifecycle';
import UploadList from './UploadList';
import UploadDetailView from './UploadDetailView';
import NavBar from './NavBar';
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";

import 'uikit/dist/css/uikit.css';
import 'uikit/dist/js/uikit.js';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons.js';

import './App.css';
import FAQPage from "./FAQPage";
import UploadCreatePage from "./UploadCreatePage";


// loads the Icon plugin
UIkit.use(Icons);

const App = ({match, location, history, ...props}) => {
    const UploadListWithData = connect(state => ({...state.uploads, ...state.loading}))(managedLifecycle(
        {
            fetch: () => actions.uploadsFetchBegin(),
            incomplete: true,
        }
    )(UploadList));

    const UploadDetailViewWithData = connect(state => ({...state.uploads.detail, ...state.loading}))(managedLifecycle(
        {
            fetch: ({uploadID}) => actions.uploadFetchBegin({_id: uploadID})
        }
    )(UploadDetailView));

    const UploadCreatePageWithData = connect(state => ({author: state.user.current}))(UploadCreatePage);

    const ErrorDisplayWithData = connect(state => ({
        ...state.errors,
    }))(ErrorDisplay);

    const SpinnerWithData = connect(state => ({
        loading: _.some(state.loading, _.matches('BEGIN')), // any running?
    }))(Spinner);

    return (
        <div className="uk-offcanvas-content App">
            <NavBar/>
            <SpinnerWithData/>
            <ErrorDisplayWithData onClose={(error) => props.dispatch(actions.errorsRemoveError(error))}/>
            <Switch>
                <Route path={`/uploads/new`} children={({match}) => (
                    <UploadCreatePageWithData {...props} />
                )}/>
                <Route path={`/uploads/:uploadID`} children={({match}) => (
                    <UploadDetailViewWithData {...props} {...match.params} />
                )}/>
                <Route path={`/faq`} children={() => (
                    <FAQPage/>
                )}/>
                <Route path={`/:filter?`} children={({match}) => (
                    <UploadListWithData {...props} {...match.params} onClick={(upload) => {
                        props.dispatch(push(`/uploads/${upload._id}`))
                    }}/>
                )}/>
            </Switch>
        </div>
    );
};

App.propTypes = {};

export default connect()(App);

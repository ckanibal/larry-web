import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';


const EmptyComponent = ({data}) => _.isEmpty(data) ? (
    <div className="uk-section uk-section-primary">
        <div className="uk-container uk-container-small">
            <h1 className="uk-heading-primary">No Content.</h1>
        </div>
    </div>
) : null;

EmptyComponent.propTypes = {
    data: PropTypes.any,
};

export default EmptyComponent;
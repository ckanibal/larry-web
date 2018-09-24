import React from 'react';
import PropTypes from 'prop-types';


const ErrorDisplay = ({items: errors, onClose}) => {
    if (errors && errors.length > 0) {
        return (
            <div>
                {
                    errors.map((error, idx) => (
                        <div key={idx} uk-alert="" className="uk-alert-danger">
                            <a className="uk-alert-close" uk-close="true" onClick={() => onClose(error)}> </a>
                            <p>
                                <span role="img" aria-label="sad-face">🙁</span>
                                An error occurred: {error.message}
                            </p>
                        </div>
                    ))
                }
            </div>
        );
    } else {
        return null;
    }
};

ErrorDisplay.propTypes = {
    items: PropTypes.array.isRequired,
    onClose: PropTypes.func,
};

export default ErrorDisplay;
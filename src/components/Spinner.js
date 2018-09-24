import React from 'react';


const Spinner = ({loading}) => loading ? <div className="uk-position-center"><div uk-spinner="ratio: 3"> </div></div> : null;

export default Spinner;
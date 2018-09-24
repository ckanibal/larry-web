import React from 'react'
import {Link} from 'react-router-dom'

const FilterLink = ({filter, selector, children}) => (
    <li data-filter-tag={filter} data-uk-filter-control={selector(filter)}>
        <Link to={`/${filter}`}>{children}</Link>
    </li>
);

export default FilterLink;
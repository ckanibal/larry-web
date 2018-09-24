import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import UploadCard from './UploadCard';
import FilterLink from './FilterLink';
import EmptyComponent from "./EmptyComponent";


export const UploadList = ({items: uploads, onClick, filter}) => (
    <section className="uk-section uk-section-default uk-padding-small uk-padding-remove-bottom">
        <div data-uk-filter={`target: .js-filter; selActive: [data-filter-tag='${filter || ''}']`}>
            <div className="uk-container uk-container-expand">
                <ul className="uk-subnav uk-subnav-pill">
                    <li uk-filter-control="" className=""><Link to={`/`}>Show all</Link></li>
                    <FilterLink filter="multiplayer"
                                selector={(filter) => `[data-tags*='${filter}']`}>Multiplayer</FilterLink>
                    <FilterLink filter="openclonk-8" selector={(filter) => `[data-tags*='${filter}']`}>OpenClonk
                        8</FilterLink>
                    <FilterLink filter="openclonk-9" selector={(filter) => `[data-tags*='${filter}']`}>OpenClonk
                        9</FilterLink>
                    <FilterLink filter="melee"
                                selector={(filter) => `[data-tags*='${filter}']`}>Melee</FilterLink>
                </ul>
            </div>
            <hr/>
            <EmptyComponent data={uploads}/>
            <div
                className="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-6@xl uk-grid-match js-filter uk-flex-top uk-flex-wrap-top uk-sortable"
                data-uk-grid="masonry: true"
            >
                {uploads.map((upload, index) => (
                    <div key={index} data-tags={_(upload.tags).map(_.property('text')).map(_.toLower).join(" ")}>
                        <UploadCard {...upload} onClick={onClick}/>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

UploadList.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    filter: PropTypes.string,
};

export default UploadList;
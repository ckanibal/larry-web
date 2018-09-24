import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import markdownIt from 'markdown-it';
import * as _ from "lodash";


function renderMarkdown(text) {
    const md = markdownIt('zero')
        .enable(['text', 'emphasis']);

    return {
        __html: md.render(text),
    };
}

const descriptionStyle = {
    maxHeight: '20em',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const UploadCard = ({onClick, _id, title, lead, tags, pic, updatedAt, author, voting, comments}) => (
    <div className="uk-card uk-card-small uk-card-default uk-overflow-hidden" onClick={() => onClick({_id})}>
        <div className="uk-card-header">
            <div className="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                <div className="uk-width-expand uk-first-column">
                    <span className="cat-txt uk-overflow-auto">
                        {
                            tags
                                .slice(0, 2)
                                .map(_.property('text'))
                                .reduce((prev, curr) => [prev, ' / ', curr])
                        }
                    </span>
                </div>
                <div className="uk-width-auto uk-text-right uk-text-muted">
                    <span uk-icon="icon: clock"> </span> {moment(updatedAt).fromNow()}
                </div>
            </div>
        </div>
        <div className="uk-card-media">
            <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
                <img className="lazy"
                     data-src={`https://picsum.photos/400/300/?random=${Math.floor(Math.random() * 10)}`} width="400"
                     height="300" alt=""
                     data-uk-img/>
                <div className="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
                    <span uk-icon="icon:heart; ratio: 0.8"> </span> {voting.sum || 0}
                    <span uk-icon="icon:comment; ratio: 0.8" style={{marginLeft: '1em'}}> </span> {comments.count || 0}
                </div>
            </div>
        </div>
        <div className="uk-card-body">
            <h6 className="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">{title}</h6>
            <p className="uk-text-small uk-text-muted" style={descriptionStyle}
               dangerouslySetInnerHTML={renderMarkdown(lead)}/>
        </div>
        <div className="uk-card-footer">
            <div className="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid="">
                <div className="uk-width-expand uk-text-small uk-text-left uk-first-column">
                    <span uk-icon="icon: user"> </span> {author.username}
                </div>
                <div className="uk-width-auto uk-text-right">
                    <a href="" uk-icon="icon: download"><span className="sr-only">Download</span></a>
                </div>
            </div>
        </div>
    </div>
);

UploadCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    pic: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    author: PropTypes.shape(
        {
            username: PropTypes.string.isRequired,
        }
    ),
    voting: PropTypes.shape(
        {
            sum: PropTypes.number,
        }
    ),
    comments: PropTypes.shape(
        {
            count: PropTypes.number,
        }
    )
};

export default UploadCard;
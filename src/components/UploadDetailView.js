import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as _ from 'lodash';
import markdownIt from 'markdown-it';
import {connect} from "react-redux";

import * as actions from "../actions";
import {managedLifecycle} from '../containers/ManagedLifecycle';
import {CommentList} from "./CommentList";


function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

const UploadDetailView = ({_id, title, lead, description, tags, images, files, author, voting, comments, updatedAt, createdAt, onClickVote}) => {
    const renderLead = (text) => {
        const md = markdownIt('zero')
            .enable(['text', 'emphasis']);

        return {
            __html: md.render(text),
        };
    };

    const renderDescription = (text) => {
        const md = markdownIt('zero')
            .enable(['text', 'emphasis', 'link']);

        return {
            __html: md.render(text),
        };
    };

    const handleTagVote = (tag, vote) => {
        console.log("Vote", tag, vote);
    };

    const CommentListWithData = connect((state) => ({...state.comments, ...state.loading}))(managedLifecycle(
        {
            fetch: () => actions.commentsFetchBegin({_id})
        }
    )(CommentList));

    return (
        <article className="uk-article">
            <div uk-slideshow="ratio: 9:3; min-height: 480; autoplay: true">
                <ul className="uk-slideshow-items">
                    <li>
                        <img data-src="https://picsum.photos/1600/1200?random" width="1600" height="1200" alt=""
                             uk-img="true"/>
                        <div className="uk-overlay uk-overlay-primary uk-position-bottom">
                            <h1 className="uk-article-title">{title}</h1>
                            <p className="uk-article-meta">
                                <span uk-icon="icon:comment; ratio: 0.8"> </span> {comments.count || 0}
                                <span>
                                <span className="uk-margin-small-left"
                                      uk-icon="icon:heart; ratio: 0.8"> </span> {voting.sum || 0}
                                    <a className="uk-margin-small-left uk-icon-link" uk-icon="plus-circle"
                                       onClick={() => onClickVote(_id, 1)}><span className="sr-only">Vote up</span></a>
                                    <a className="uk-icon-link" uk-icon="minus-circle"
                                       onClick={() => onClickVote(_id, -1)}><span
                                        className="sr-only">Vote down</span></a>
                                </span>
                                <br/>
                                Uploaded {moment(createdAt).fromNow()} by <b>{author.username}</b>, Last
                                Update {moment(updatedAt).fromNow()}
                            </p>
                            <p className="uk-text-lead uk-height-max-small"
                               dangerouslySetInnerHTML={renderLead(lead)}/>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="uk-section uk-section-muted uk-padding-small">
                <div className="uk-overflow-auto tags" style={{whiteSpace: "nowrap"}}>
                    {
                        _(tags)
                            .map(_.property('text'))
                            .map(text => (
                                <span key={text} className="uk-label">{text}
                                    <a className="uk-link-reset uk-margin-small-left" alt="upvote"
                                       onClick={() => handleTagVote(text, 1)}>+</a>
                                    <a className="uk-link-reset uk-margin-small-left" alt="downvote"
                                       onClick={() => handleTagVote(text, -1)}>-</a>
                                </span>
                            ))
                            .reduce((prev, curr) => [prev, ' ', curr])
                    }
                </div>
                <p uk-margin="true">
                    <button className="uk-button uk-button-default uk-button-small uk-margin-right"
                            uk-toggle="target: .formHide" type="button">Add tags
                    </button>
                    <input className="uk-input uk-form-small uk-form-width-large formHide" hidden="true"
                           placeholder="Tags (multiple possible with comma)"
                           required pattern="\w{3,}(?:,\s*\w{3,})*" title="Wrong format"/>
                    <button className="uk-button uk-button-primary uk-button-small formHide" hidden="true"
                            type="submit">Save
                    </button>
                    <button className="uk-button uk-button-secondary uk-button-small formHide" hidden="true"
                            type="button">Abort
                    </button>
                </p>
            </div>
            <div className="uk-section uk-section-default uk-padding-small">
                <p dangerouslySetInnerHTML={renderDescription(description)}/>
                <h4>Download</h4>
                <ul className="uk-list uk-list-striped">
                    {
                        files.map(({filename, length, _id}, idx) => (
                            <li key={idx} className="uk-grid-match" uk-grid="true">
                                <div className="uk-width-expand">{filename}</div>
                                <div className="uk-width-auto">{humanFileSize(length)}</div>
                                <div className="uk-width-1-6">
                                    <a href={`${process.env.REACT_APP_API_ENDPOINT}/media/${_id}?dl`}
                                       className="uk-icon-button uk-button-primary" uk-icon="download">Download</a>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <CommentListWithData/>
        </article>
    );
};

UploadDetailView.defaultProps = {
    description: '',
    onClickVote: console.log,
};

UploadDetailView.propTypes = {
    title: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    pic: PropTypes.string,
    files: PropTypes.array,
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
    ),
    onClickVote: PropTypes.func,
};


export default UploadDetailView;
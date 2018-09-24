import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import markdownIt from "markdown-it";


const renderBody = (text) => {
    const md = markdownIt('zero')
        .enable(['text', 'emphasis']);

    return {
        __html: md.render(text),
    };
};

export const Comment = ({_id, body, updatedAt, author: {username}, voting: {sum}, onClickVote, onClickFlag}) => (
    <article className="uk-comment uk-comment-primary">
        <header className="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid="true">
            <div className="uk-width-auto">
                <img className="uk-comment-avatar" data-src="https://picsum.photos/80/80?random" width="80" height="80"
                     alt="Avatar" uk-img="true"/>
            </div>
            <div className="uk-width-expand">
                <h4 className="uk-comment-title uk-margin-remove"><a className="uk-link-reset" href="/">{username}</a>
                </h4>
                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li>{moment(updatedAt).fromNow()}</li>
                    <li>
                        <span>{sum}
                            <a className="uk-margin-small-left uk-icon-link" uk-icon="plus-circle"
                               onClick={() => onClickVote(_id, 1)}><span className="sr-only">Vote up</span></a>
                            <a className="uk-icon-link" uk-icon="minus-circle"
                               onClick={() => onClickVote(_id, -1)}><span className="sr-only">Vote down</span></a>
                        </span>
                    </li>
                    <li>
                        <button className="uk-icon-link" uk-icon="warning" onClick={() => onClickFlag(_id)}>
                            <span className="sr-only">Report</span>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
        <div className="uk-comment-body">
            <p dangerouslySetInnerHTML={renderBody(body)}/>
        </div>
    </article>
);

Comment.defaultProps = {
    onClickFlag: () => {
    },
    onClickVote: () => {
    },
};

Comment.propTypes = {
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
    updatedAt: PropTypes.string.isRequired,
    onClickVote: PropTypes.func,
    onClickFlag: PropTypes.func,
};

export default Comment;
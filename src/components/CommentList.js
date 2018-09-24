import React from 'react';
import PropTypes from 'prop-types';
import Comment from "./Comment";


export const CommentList = ({items: comments, onClick}) => (
    <ul className="uk-comment-list">
        <li>
            {
                comments.map((comment,idx) => (<Comment key={idx} {...comment}/>))
            }
        </li>
    </ul>
);

CommentList.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    filter: PropTypes.string,
};

export default CommentList;
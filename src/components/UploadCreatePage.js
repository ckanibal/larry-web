import React, {Component} from 'react';
import ContentEditable from 'react-sane-contenteditable';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as _ from 'lodash';
import markdownIt from 'markdown-it';
import uploadBlueprint from "../containers/UploadBlueprint";


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

class UploadCreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {...uploadBlueprint, ...props};
    }

    handleChange = (field) => (ev, value) => {
        this.setState({ [field]: value });
    };

    render() {
        const {
            title,
            lead,
            description,
            tags,
            images,
            files,
            author,
            voting,
            comments,
            updatedAt,
            createdAt,
        } = this.state;

        const renderDescription = (text) => {
            const md = markdownIt('zero').enable(['text', 'emphasis', 'link']);
            return {
                __html: md.render(text),
            };
        };

        return (
            <article className="uk-article">
                <div className="uk-alert-primary uk-margin-remove-bottom" uk-alert="">
                    <a className="uk-alert-close" uk-close=""><span className="sr-only">close</span></a>
                    <h3>What now?</h3>
                    <p>Edit this page by clicking on <span uk-icon="pencil"/> fields. Use Drag&Drop for files and
                        images!</p>
                </div>
                <div className="uk-inline" style={{display: "block"}}>
                    <div uk-slideshow="ratio: 9:3; min-height: 480; autoplay: true">
                        <ul className="uk-slideshow-items">
                            <li>
                                <img data-src="https://picsum.photos/1600/1200?random" width="1600" height="1200" alt=""
                                     uk-img="true"/>
                            </li>
                        </ul>
                    </div>
                    <div className="uk-overlay uk-overlay-primary uk-position-bottom">
                        <ContentEditable
                            tagName="h1"
                            className="uk-article-title uk-display-inline-block"
                            content={title}
                            editable={true}
                            maxLength={80}
                            multiLine={false}
                            onChange={this.handleChange('title')}
                            // onKeyDown={this.handleChange('title')}
                            caretPosition="end"
                        />
                        <span uk-icon="pencil"/>
                        <p className="uk-article-meta">
                            <span uk-icon="icon:comment; ratio: 0.8"> </span> {comments.count || 0}
                            <span><span className="uk-margin-small-left"
                                        uk-icon="icon:heart; ratio: 0.8"> </span> {voting.sum || 0}</span>
                            <br/>
                            Uploaded {moment(createdAt).fromNow()} by <b>{author.username}</b>, Last
                            Update {moment(updatedAt).fromNow()}
                        </p>
                        <ContentEditable
                            tagName="p"
                            className="uk-text-lead uk-display-inline-block uk-width-auto uk-text-break uk-height-max-small"
                            content={lead}
                            editable={true}
                            maxLength={140}
                            multiLine={false}
                            onChange={function(ev, value) {this.setState({lead: value})}}
                            // onKeyDown={this.handleChange('lead')}
                            caretPosition="end"
                        /><span uk-icon="pencil"/>
                    </div>
                </div>
                <div className="uk-section uk-section-muted uk-padding-small">
                    <div className="uk-overflow-auto tags" style={{whiteSpace: "nowrap"}}>
                        {
                            _(tags)
                                .map(_.property('text'))
                                .map(text => (
                                    <span key={text} className="uk-label">{text}
                                </span>
                                ))
                                .reduce((prev, curr) => [prev, ' ', curr])
                        }
                    </div>
                    <p uk-margin="true">
                        <button className="uk-button uk-button-default uk-button-small uk-margin-right"
                                uk-toggle="target: .formHide" type="button">Add tags <span uk-icon="pencil"/>
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
                    <p contentEditable={true} className="uk-display-inline-block uk-width-auto uk-text-break"
                       dangerouslySetInnerHTML={renderDescription(description)}/>
                    <span uk-icon="pencil"/>
                    <h4>Downloads</h4>
                    <ul className="uk-list uk-list-striped">
                        <div className="js-upload uk-placeholder uk-text-center">
                            <span uk-icon="icon: cloud-upload" className="uk-margin-small-right"/>
                            <span className="uk-text-middle">Attach files by dropping them here or </span>
                            <div uk-form-custom="">
                                <input type="file" multiple/>
                                <span className="uk-link">selecting one</span>
                            </div>
                        </div>
                        <progress id="js-progressbar" className="uk-progress" value="0" max="100" hidden/>
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
            </article>
        );
    }
}

UploadCreatePage.propTypes = {
    // title: PropTypes.string.isRequired,
    // lead: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // tags: PropTypes.array.isRequired,
    // pic: PropTypes.string,
    // files: PropTypes.array,
    // updatedAt: PropTypes.string.isRequired,
    // author: PropTypes.shape(
    //     {
    //         username: PropTypes.string.isRequired,
    //     }
    // ),
    // voting: PropTypes.shape(
    //     {
    //         sum: PropTypes.number,
    //     }
    // ),
    // comments: PropTypes.shape(
    //     {
    //         count: PropTypes.number,
    //     }
    // ),
};


export default UploadCreatePage;
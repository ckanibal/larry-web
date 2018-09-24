import React, {Fragment} from 'react';


export const FAQPage = () => (
    <Fragment>
        <div className="uk-section uk-section-default">
            <div className="uk-container">

                <h3>Section Default</h3>

                <div className="uk-grid-match uk-child-width-1-3@m" uk-grid>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="uk-section uk-section-muted">
            <div className="uk-container">

                <h3>Section Muted</h3>

                <div className="uk-grid-match uk-child-width-1-3@m" uk-grid>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="uk-section uk-section-primary uk-light">
            <div className="uk-container">

                <h3>Section Primary</h3>

                <div className="uk-grid-match uk-child-width-1-3@m" uk-grid>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="uk-section uk-section-secondary uk-light">
            <div className="uk-container">

                <h3>Section Secondary</h3>

                <div className="uk-grid-match uk-child-width-1-3@m" uk-grid>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    </div>
                </div>

            </div>
        </div>

        <div className="uk-section-default">
            <div className="uk-section uk-light uk-background-cover"
                 style={{backgroundImage: 'url(https://picsum.photos/1600/1200?random)'}}>
                <div className="uk-container">

                    <h3>Section with Images</h3>

                    <div className="uk-grid-match uk-child-width-1-3@m" uk-grid>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
);

FAQPage.propTypes = {};

export default FAQPage;
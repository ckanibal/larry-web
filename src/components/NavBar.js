import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import logo from './logo.svg';
import UserMenu from "./UserMenu";


const NavBar = ({...props}) => (
    <nav className="uk-navbar-container" uk-navbar="">
        <div className="uk-navbar-left">
            <Link className="uk-navbar-item uk-logo" to="/">
                <img className="App-logo uk-padding-small" src={logo} alt="Logo" data-uk-svg/>
                Larry
            </Link>
        </div>

        <div className="uk-navbar-item">
            <form>
                <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: search"/>
                    <input className="uk-input uk-form-width-large" type="text"/>
                </div>
            </form>
        </div>

        <div className="uk-navbar-right">
            <ul className="uk-navbar-nav uk-margin-right uk-parent">
                <li className="uk-visible@s uk-active"><Link to="/">Home</Link></li>
                <li className="uk-visible@s"><Link to="/faq">FAQ</Link></li>
                <li className="uk-visible@s">
                    <a data-uk-icon="icon:user"><span className="sr-only">User</span></a>
                    <div className="drop-nav uk-dropdown uk-navbar-dropdown-width-2"
                         data-uk-dropdown="mode: click; animation: uk-animation-slide-bottom-small; duration: 150">
                        <UserMenu {...props}/>
                    </div>
                </li>
                <li className="uk-hidden@s">
                    <a data-uk-navbar-toggle-icon data-uk-toggle href="#offcanvas-nav">
                        <span className="sr-only">Toggle nav</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

NavBar.propTypes = {
    user: PropTypes.object,
};

export default NavBar;
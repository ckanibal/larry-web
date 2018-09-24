import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../actions";

const MenuProfile = ({username, onClickLogout}) => (
    <div>
        <h4 className="uk-margin-small-bottom uk-margin-remove-adjacent">
            <span uk-icon="icon: user"> </span>
            {username}
        </h4>
        <p>
            This could be your chart!
        </p>
        <hr/>
        <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="">
            <li className="uk-nav-header">Header</li>
            <li><a><span className="uk-margin-small-right"
                         data-uk-icon="icon: table"> </span> Item</a></li>
            <li><a><span className="uk-margin-small-right"
                         data-uk-icon="icon: thumbnails"> </span> Item</a>
            </li>
            <li>
                <a onClick={onClickLogout}>
                    <span className="uk-margin-small-right" data-uk-icon="icon: sign-out"> </span>
                    Logout
                </a>
            </li>
        </ul>
    </div>
);

class LocalLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: "",
            password: "",
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.userLoginBegin({user: this.state}));
    };

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="uk-inline">
                    <span className="uk-margin-small uk-form-icon" uk-icon="icon: user"> </span>
                    <input className="uk-input" placeholder="Username" type="text" name="identity"
                           value={this.state.identity} onChange={this.handleInputChange}/>
                </div>
                <div className="uk-margin-small uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: lock"> </span>
                    <input className="uk-input" placeholder="Password" type="password" name="password"
                           value={this.state.password} onChange={this.handleInputChange}/>
                </div>
                <div className="uk-margin-small uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: sign-in"> </span>
                    <input className="uk-input" type="submit" value="Login with Larry"/>
                </div>
            </form>);
    }
}

LocalLogin.propTypes = {};

const ClonkspotLogin = () => (
    <button className="uk-button uk-button-primary">
        Login with clonkspot
    </button>
);

const LoginProvider = ({clonkspot, local, ...props}) => (
    <div>
        {clonkspot && <ClonkspotLogin {...props}/>}
        <hr className="uk-divider-icon"/>
        {local && <LocalLogin {...props} />}
    </div>
);

const UserMenu = ({user, ...props}) => (
    <div align="center">
        {user.current ?
            <MenuProfile {...user} onClickLogout={() => props.dispatch(actions.userLogout())}/>
            :
            <LoginProvider local clonkspot {...props} />}
    </div>
);

UserMenu.propTypes = {
};

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserMenu);
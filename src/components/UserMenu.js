import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import Spinner from "./Spinner";
import {push} from "connected-react-router";

const MenuProfile = ({username, onClickAddUpload, onClickSettings, onClickLogout}) => (
    <div>
        <h4 className="uk-margin-small-bottom uk-margin-remove-adjacent">
            <span uk-icon="icon: user"> </span> {username}
        </h4>
        <p>
            This could be your chart!
        </p>
        <hr/>
        <ul className="uk-iconnav uk-iconnav-vertical">
            <li className="uk-nav-header">Choose wisely.</li>
            <li><a onClick={onClickAddUpload}><span className="uk-margin-small-right"
                                                    data-uk-icon="icon: cloud-upload"> </span> Add upload</a></li>
            <li><a onClick={onClickSettings}><span className="uk-margin-small-right"
                                                   data-uk-icon="icon: settings"> </span> Settings</a>
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
                    <input className={`uk-input ${this.props.error ? 'uk-form-danger' : ''}`} placeholder="Username"
                           type="text" name="identity" value={this.state.identity} onChange={this.handleInputChange}/>
                </div>
                <div className="uk-margin-small uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: lock"> </span>
                    <input className={`uk-input ${this.props.error ? 'uk-form-danger' : ''}`} placeholder="Password"
                           type="password" name="password" value={this.state.password}
                           onChange={this.handleInputChange}/>
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

const UserMenu = ({user, loading, ...props}) => (
    <div align="center">
        {
            user.current ?
                <MenuProfile {...user.current}
                             onClickAddUpload={() => props.dispatch(push(`/uploads/new`))}
                             onClickSettings={() => props.dispatch(actions.userSettingsShow())}
                             onClickLogout={() => props.dispatch(actions.userLogoutBegin())}
                />
                :
                <LoginProvider local clonkspot {...user} {...props} />
        }
        <div className="uk-position-center">
            <Spinner loading={loading['USER_LOGIN'] === 'BEGIN'}/>
        </div>
    </div>
);

UserMenu.propTypes = {};

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
});

export default connect(mapStateToProps)(UserMenu);
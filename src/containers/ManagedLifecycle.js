import React, {Component} from "react";


export const managedLifecycle = ({fetch, incomplete = false,}) => {
    return (WrappedComponent) => (class extends Component {
        constructor(props) {
            super(props);
            const [, requestName,] = /(.*)_(BEGIN|SUCCESS|FAILURE)/.exec(fetch(props).type);
            this.state = {
                requestName,
            };
        }

        componentDidMount() {
            // Do not re-run already running request
            if (!(this.state.requestName in this.props && this.props[this.state.requestName] === 'BEGIN')) {
                this.props.dispatch(fetch.call(this, this.props));
            }
        }

        isSuccessful = (props = this.props) => {
            if (this.state.requestName in props) {
                return props[this.state.requestName] === 'SUCCESS';
            } else {
                return false;
            }
        };

        shouldComponentUpdate = (nextProps) => {
            if (this.state.requestName in this.props && this.state.requestName in nextProps) {
                return this.props[this.state.requestName] !== nextProps[this.state.requestName];
            } else {
                return incomplete;
            }
        };

        render() {
            return (this.isSuccessful() || incomplete) ? <WrappedComponent {...this.props} /> : null;
        }
    });
};

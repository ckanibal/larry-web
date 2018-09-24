import React, {Component} from "react";
import DataSource from "./DataSource";

function InjectData(WrappedComponent, selectData) {
    // ...and returns another component...
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: selectData(props)
            };
        }

        componentDidMount() {
            // ... that takes care of the subscription...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(this.props)
            });
        }

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}

export default InjectData;
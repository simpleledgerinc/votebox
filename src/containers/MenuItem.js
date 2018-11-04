import React, { Component } from 'react';
import {
  Route,
  withRouter
} from "react-router-dom";
import {
    Menu
} from 'semantic-ui-react';

class MenuItem extends Component {
    _handleClick = () => {
        this.props.history.push(this.props.to);
    };

    render(){
        console.log('props', this.props)
        return (
            <Route
                exact={this.props.exact} path={this.props.to}
                children={({ match }) => (
                    <Menu.Item
                        active={!!match}
                        onClick={this._handleClick}>

                        {this.props.children}
                    </Menu.Item>
                )}
            />
        );
    }
}

export default withRouter(MenuItem);
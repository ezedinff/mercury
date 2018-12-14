import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter as Router } from "react-router-redux";
import PropTypes from "prop-types";
import Sidebar from "react-sidebar";

import { authenticate, unauthenticate } from "actions/session";
import {
  App,
  ErrorMessage,
  NotFound,
  Signup,
  Login,
  MatchAuthenticated,
  RedirectAuthenticated,
  Header
} from "components";

import Projects from "../components/Project";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = {
      isAuthenticated,
      willAuthenticate
    };

    return (
      <div className="full-height">
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>-></button>
          <ErrorMessage />
          <Router history={this.props.history}>
            <Switch>
              <MatchAuthenticated
                exact
                path="/"
                component={App}
                {...authProps}
              />
              <RedirectAuthenticated
                exact
                path="/signup"
                component={Signup}
                {...authProps}
              />
              <RedirectAuthenticated
                exact
                path="/login"
                component={Login}
                {...authProps}
              />
              <MatchAuthenticated
                exact
                path="/projects"
                component={Projects}
                {...authProps}
              />

              <Route component={NotFound} />
            </Switch>
          </Router>
        </Sidebar>
      </div>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  authenticate: PropTypes.func.isRequired,
  unauthenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  authenticate: () => dispatch(authenticate()),
  unauthenticate: () => dispatch(unauthenticate())
});

const mapStateProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  willAuthenticate: state.session.willAuthenticate
});

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Root);

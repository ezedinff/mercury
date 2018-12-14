import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter as Router } from "react-router-redux";
import PropTypes from "prop-types";
import Sidebar from "react-sidebar";
import { Button } from "react-bootstrap";

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

const mql = window.matchMedia(`(min-width: 800px)`);

import Projects from "../components/Project";
import SidBarContent from "../components/Sidebar";
import Project from "../components/Project/project";

const sidebarStyle = () => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "white !important",
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
});

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: mql.matches
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    const { isAuthenticated, willAuthenticate, history } = this.props;
    console.log("rooot", this.props);
    const authProps = {
      isAuthenticated,
      willAuthenticate,
      history
    };

    return (
      <div className="full-height">
        <Sidebar
          sidebar={
            <div>
              <SidBarContent />
            </div>
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              zIndex: 2,
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "40%",
              backgroundColor: "#FFF",
              transition: "transform .3s ease-out",
              WebkitTransition: "-webkit-transform .3s ease-out",
              willChange: "transform",
              overflowY: "auto"
            }
          }}
        >
          <Button onClick={() => this.onSetSidebarOpen(true)} variant="dark">
            <i class="fas fa-bars" />
          </Button>
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
              <MatchAuthenticated
                exact
                path="/projects/:id/"
                component={Project}
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

const mapStateProps = (state, { id }) => ({
  isAuthenticated: state.session.isAuthenticated,
  willAuthenticate: state.session.willAuthenticate
});

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Root);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/index";
import Projects from "../Project";
import Profile from "../Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Flex, Box, Text } from "rebass";

export class App extends Component {
  render() {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
};

App.defaultProps = {
  username: ""
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: () => dispatch(logout())
});

const mapStateProps = state => ({
  username: state.session.currentUser.username
});

export default connect(
  mapStateProps,
  mapDispatchToProps
)(App);

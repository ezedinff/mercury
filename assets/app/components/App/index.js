import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/index";
import Project from "../Project";

export class App extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header />
        <Project />
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

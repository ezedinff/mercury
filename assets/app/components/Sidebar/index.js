import React from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { Flex, Box, Text } from "rebass";
import { Link } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";

class SidBarContent extends React.Component {
  render() {
    return (
      <Box>
        <a href="/projects">All Projects</a>
        <Box />
        <Box>
          <a href="/projects">All Projects</a>
        </Box>
      </Box>
    );
  }
}

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
)(SidBarContent);

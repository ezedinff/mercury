import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Flex, Box, Text } from "rebass";
import ProfileCard from "./profileCard";
import { updateProfile } from "../../actions/session";
import { Button } from "react-bootstrap";

export class Profile extends Component {
  state = {
    profileImage: null
  };
  handelImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("RESULT", reader.result);
      this.setState({ projectImage: reader.result });
    };
    reader.readAsDataURL(file);
  }
  render() {
    console.log(this.props);
    const { user, dispatch } = this.props;
    return (
      <Box>
        <ProfileCard
          profilePicture="https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"
          user={"abenezer yakov"}
          userProfile={"/profile/"}
          isRounded={true}
          w={60}
          h={60}
        />
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileInput => (this.fileInput = fileInput)}
        />
        <a onClick={() => this.fileInput.click()}> change profile picture</a>
        <Button onClick={() => dispatch(updateProfile({ user: user }))}>
          change picture
        </Button>
      </Box>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
};

Profile.defaultProps = {
  username: ""
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: () => dispatch(logout())
});

const mapStateProps = state => ({
  user: state.session.currentUser
});

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Profile);

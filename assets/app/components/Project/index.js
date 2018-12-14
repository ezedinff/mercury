import React, { Children } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { postProject, getProject } from "../../actions/projects";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import FormExample from "./form";
import ProjectList from "./projectList";
import { Flex, Box, Text } from "rebass";

class Projects extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setState({
      title: "new title",
      newProject: null,
      showModal: false
    });
  }

  componentWillMount() {
    console.log("component will moutn ", this.props);
    this.props.dispatch(getProject());
  }
  render() {
    console.log(this.props, "jbljblbljb");
    // console.log(postProject);

    const { dispatch, user } = this.props;

    let modalClose = () => this.setState({ showModal: false });
    //postProject({ project: { title: "test", content: "test conte" } })
    console.log(this.state);
    return (
      <div>
        <Box m={10}>
          <Button
            variant="dark"
            onClick={() => this.setState({ showModal: true })}
          >
            Create new project
          </Button>
        </Box>

        <FormExample
          show={this.state && this.state.showModal}
          modalClose={modalClose}
          dispatch={dispatch}
          user={user}
        />
        <ProjectList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: () => dispatch(logout())
});

const mapStateProps = state => ({
  user: state.session.currentUser
});

export default connect(mapStateProps)(Projects);

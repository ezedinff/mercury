import { Formik } from "formik";
import React from "react";
import { Modal, Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { postProject } from "../../actions/projects";

import { connect } from "react-redux";

const ModalComponent = ({ show, modalClose, render, handleSubmitOnClick }) => (
  <Modal
    size="lg"
    show={show}
    onHide={modalClose}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Create new Project
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>{render()}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={modalClose}>
        Close
      </Button>
      <Button type="submit" variant="dark" onClick={handleSubmitOnClick}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>
);

const schema = yup.object({
  title: yup.string().required(),
  complicity: yup.number().required(),
  content: yup.string().required(),
  estimated_progress: yup
    .number()
    .positive()
    .integer(),
  estimated_time: yup.string().required()
});
const range = (start, end) => {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
};

class FormExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setState({
      showModal: false,
      projectDescription: "",
      values: null,
      isValid: false
    });
  }

  handleSubmitOnClick = () => {
    const { dispatch, user } = this.props;
    const { projectDescription, values } = this.state;
    console.log(user);
    console.log(
      {
        ...values,
        content: projectDescription,
        user_id: user.id
      },
      "llllllll"
    );
    dispatch(
      postProject({
        project: { ...values, content: projectDescription, user_id: user.id }
      })
    );
  };
  render() {
    // console.log(this.props, "props");
    // console.log(this.state, "state");

    return (
      <ModalComponent
        show={this.props && this.props.show}
        modalClose={this.props.modalClose}
        handleSubmitOnClick={this.handleSubmitOnClick}
        isValid={this.state && this.state.isValid}
        render={() => (
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            /*initialValues={{
          Title: "Mark",
          estimatedTime: "Otto"
        }}*/
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => {
              console.log(isValid, "isvalid");
              this.setState({ values: values });
              return (
                <Form noValidate onSubmit={this.handleSubmitOnClick}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label> Title</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isValid={touched.title && !errors.title}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                      <Form.Label>Current progress state %</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        name="estimated_progress"
                        value={values.estimated_progress}
                        onChange={handleChange}
                        isValid={
                          touched.estimated_progress &&
                          !errors.estimated_progress
                        }
                        isInvalid={!!errors.estimated_progress}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                      <Form.Control.Feedback type="invalid" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                      <Form.Label>Estimated Time</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        name="estimated_time"
                        value={values.estimated_time}
                        onChange={handleChange}
                        isValid={
                          touched.estimated_time && !errors.estimated_time
                        }
                      />

                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid" />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>Complicity</Form.Label>
                      <InputGroup>
                        <Form.Control
                          size="sm"
                          as="select"
                          placeholder="complicity"
                          aria-describedby="inputGroupPrepend"
                          name="complicity"
                          value={values.complicity}
                          onChange={handleChange}
                          isInvalid={!!errors.complicity}
                        >
                          {" "}
                          {range(0, 10).map(value => (
                            <option>{value}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors.complicity}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Form.Row>

                  <div className="App">
                    <Form.Label>Description</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={
                        (this.state &&
                          this.state.projectDescription &&
                          this.state.projectDescription.length > -1 &&
                          this.state.projectDescription) ||
                        ""
                      }
                      onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.setState({ projectDescription: data });
                      }}
                      onBlur={editor => {
                        //console.log("Blur.", editor);
                      }}
                      onFocus={editor => {
                        //console.log("Focus.", editor);
                      }}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      />
    );
  }
}

export default FormExample;

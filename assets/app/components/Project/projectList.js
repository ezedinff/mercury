import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button, ProgressBar } from "react-bootstrap";
import { Flex, Box, Text } from "rebass";
import ProfileCard from "../Profile/profileCard";

const getCardImage = image_binary => {
  var image = new Image();
};

const ProjectItem = ({ project }) => (
  <Box m={2} key={project.id}>
    <Card border="secondary" style={{ width: "18rem" }}>
      <Card.Header as="h5">
        <Text
          fontSize={[0.5, 2, 2]}
          mx={2}
          fontWeight="bold"
          color="grey"
          style={{
            wordWrap: "break-word",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {project.title}
        </Text>
      </Card.Header>
      <Card.Body>
        <Card.Img
          height={"150px"}
          variant="top"
          src={
            project.image_binary ||
            "data:image/jpeg;base64,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"
          }
        />
        <Box h={10}>
          <div
            style={{ fontSize: "10px", maxHeight: "16rem", overflow: "scroll" }}
            dangerouslySetInnerHTML={{
              __html: project.content && project.content
            }}
          />
        </Box>
        <Box mx={2} my={1}>
          <ProfileCard
            profilePicture="https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"
            user={"abenezer yakov"}
            userProfile={"/profile/"}
            isRounded={true}
            w={50}
            h={50}
          />
        </Box>
        <Box mx={2} my={2}>
          <ProgressBar variant="success" now={project.estimated_progress} />
        </Box>
        <Flex justifyContent="space-around">
          <Flex>
            <Text fontSize={[1, 2, 2]} mx={2} fontWeight="bold" color="grey">
              <i className="fas fa-business-time" />
            </Text>
            <Text fontSize={[1, 2, 2]} fontWeight="bold" color="grey">
              {project.estimated_time}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={[1, 2, 2]} mx={2} fontWeight="bold" color="grey">
              <i className="fas fa-brain" />
            </Text>
            <Text fontSize={[1, 2, 2]} fontWeight="bold" color="grey">
              {project.complicity}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={[1, 2, 2]} mx={2} fontWeight="bold" color="grey">
              <i className="fas fa-users" />
            </Text>
            <Text fontSize={[1, 2, 2]} fontWeight="bold" color="grey">
              5/{project.complicity}
            </Text>
          </Flex>
        </Flex>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  </Box>
);

class ProjectList extends React.Component {
  render() {
    const { projects } = this.props;
    console.log(projects, "projectlist");
    return (
      <div>
        <Flex flexWrap="wrap" p={4}>
          {projects &&
            projects.map(project => <ProjectItem project={project} />)}
        </Flex>
        ;
      </div>
    );
  }
}

const mapStateProps = state => ({
  projects: state.project.projects
});

export default connect(mapStateProps)(ProjectList);

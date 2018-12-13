import React from "react";
import { connect } from "react-redux";
import { ListGroup, Card, Button, ProgressBar } from "react-bootstrap";
import { Flex, Box, Text } from "rebass";
import ProfileCard from "../Profile/profileCard";

const ProjectItem = ({ project }) => (
  <Box m={2} key={project.id}>
    <Card style={{ width: "18rem" }}>
      <Card.Header as="h5">
        <Card.Title>
          <Text
            fontSize={[1, 2, 2]}
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
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Box h={10}>
          <div
            style={{ height: "15rem" }}
            dangerouslySetInnerHTML={{
              __html:
                project.content && project.content.substring(-1, 220) + "..."
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

import React from "react";
import { Figure, Image } from "react-bootstrap";
import { Flex, Box, Text } from "rebass";

const ProfileCard = ({
  profilePicture,
  w = 100,
  h = 100,
  isRounded = false,
  userProfile,
  user
}) => (
  <Flex>
    <Box mx={2}>
      <Figure.Image
        width={w}
        height={h}
        alt={w + "x" + h}
        src={profilePicture}
        roundedCircle={isRounded}
      />
    </Box>
    <Box mx={2} py={3}>
      <Figure.Caption>
        <a href={userProfile}>{user}</a>
      </Figure.Caption>
    </Box>
  </Flex>
);

export default ProfileCard;

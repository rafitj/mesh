import {
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Container centerContent={true} height={'100vh'}>
      <Center h={'100vh'}>
        <Stack direction="column" textAlign="center">
          <Text>Welcome to</Text>
          <Heading>Mesh</Heading>
          <Link to="/projects">
            <Button>Start</Button>
          </Link>
        </Stack>
      </Center>
    </Container>
  );
};

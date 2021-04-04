import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import MeshLogo from '../assets/MeshLogoTransparent.svg';
import { CreateStompClient } from './StompJS';

export const Home = () => {
  React.useEffect(() => {
    CreateStompClient();
  })
  return (
    <Container centerContent={true} height={'100vh'}>

      <Center h={'100vh'}>
        <Stack
          width="60%"
          direction="column"
          textAlign="center"
          pb={20}
          spacing={3}
        >
          <Image margin="0 auto" width="40%" src={MeshLogo} p={5} />
          <Box>
            <Text size="md">Welcome to</Text>
            <Heading size="lg">mesh</Heading>
          </Box>
          <Text color="gray.500">
            Build and simulate server architecture to optimize your applications
          </Text>
          <Link to="/projects">
            <Button width="100%" my={1}>
              Start
            </Button>
          </Link>
        </Stack>
      </Center>
    </Container>
  );
};

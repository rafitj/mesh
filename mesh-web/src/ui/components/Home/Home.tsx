import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import MeshLogo from '../../assets/MeshLogoTransparent.svg';
import { HomeAuth } from './HomeAuth';

export const Home = observer(() => {
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
          <Text color="gray.500" mb={1}>
            Build and simulate server architecture to optimize your applications
          </Text>
          <HomeAuth />
        </Stack>
      </Center>
    </Container>
  );
});

import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { IoMdResize } from 'react-icons/io';
import { useWindowSize } from '../../../hooks/useWindowSize';
import {
  NetworkContext,
  ProjectContext,
  UserContext,
} from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';
import { Network } from '../Network/Network';
import { ProjectSelectBar } from './ProjectSelectBar';
import { ResourceInfo } from './ResourceInfo';

export const ProjectDashboard = observer(() => {
  const toast = useToast();
  const ProjectStore = React.useContext(ProjectContext);
  const NetworkStore = React.useContext(NetworkContext);
  const UserStore = React.useContext(UserContext);
  const [w, h] = useWindowSize();
  const [plsResize, setPlsResize] = React.useState(false);

  React.useEffect(() => {
    if (UserStore.user && !ProjectStore.viewMode) {
      ProjectStore.fetchProjectsByUserId(UserStore.user.id).then(() => {
        toast({
          ...toastSettings,
          title: ProjectStore.statusMessage,
          status: ProjectStore.hasError ? 'error' : 'success',
        });
      });
    } else if (UserStore.returningUsername) {
      UserStore.fetchUserAndProjects(UserStore.returningUsername);
    }
    NetworkStore.initSimulation();
  }, []);

  React.useEffect(() => {
    setPlsResize(w < 1280 || h < 720);
  }, [w, h]);

  return (
    <>
      {plsResize && (
        <Center
          width="100vw"
          height="100vh"
          position="absolute"
          zIndex={99}
          overflow={'hidden'}
          backgroundColor="gray.900"
          opacity={0.95}
        >
          <Stack textAlign="center" width="100%">
            <Icon
              as={IoMdResize}
              w={10}
              h={10}
              color="green.400"
              margin="0 auto"
            />
            <Heading>Please resize your browser</Heading>
            <Text>Make sure your screen is at least 1280px by 720px</Text>
          </Stack>
        </Center>
      )}
      <Box padding={5} height="100vh">
        <Grid
          h="100%"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(14, 1fr)"
          gap={4}
          opacity={plsResize ? 0.5 : 1}
        >
          <GridItem
            rowSpan={6}
            colSpan={3}
            bg="gray.900"
            rounded={'md'}
            overflowY="scroll"
            overflowX="hidden"
          >
            <ProjectSelectBar />
          </GridItem>
          <GridItem rowSpan={4} colSpan={11} position="relative">
            <Network />
          </GridItem>
          <GridItem
            rowSpan={2}
            colSpan={11}
            bg="gray.900"
            rounded={'md'}
            overflowY="hidden"
          >
            <ResourceInfo />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
});

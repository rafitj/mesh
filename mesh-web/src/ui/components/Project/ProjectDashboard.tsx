import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';
import { Network } from '../Network/Network';
import { ProjectSelectBar } from './ProjectSelectBar';
import { ResourceInfo } from './ResourceInfo';

export const ProjectDashboard = observer(() => {
  const toast = useToast();
  const ProjectStore = React.useContext(ProjectContext);

  React.useEffect(() => {
    ProjectStore.fetchProjects().then(() => {
      toast({
        ...toastSettings,
        title: ProjectStore.statusMessage,
        status: ProjectStore.hasError ? 'error' : 'success',
      });
    });
  });

  return (
    <Box padding={5} height="100vh">
      <Grid
        h="100%"
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(14, 1fr)"
        gap={4}
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
  );
});

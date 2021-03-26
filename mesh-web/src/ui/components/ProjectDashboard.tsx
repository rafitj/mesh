import { Box, Grid, GridItem } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../stores/MeshContext';
import { Network } from './Network/Network';
import { ProjectSelectBar } from './ProjectSelectBar';
import { ResourceInfo } from './ResourceInfo';

export const ProjectDashboard = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
  
  React.useEffect(() => {
    ProjectStore.fetchProjects();
  });

  return (
    <Box padding={5} height="100vh">
      <Grid
        h="100%"
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={6} bg="gray.900" rounded={'md'} overflowY="scroll">
          <ProjectSelectBar />
        </GridItem>
        <GridItem rowSpan={4} colSpan={5} position="relative">
          <Network />
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={5}
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

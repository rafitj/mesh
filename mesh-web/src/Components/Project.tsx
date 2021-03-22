import { Box, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Resource } from '../types/Resources';
import { Network } from './Network';
import { ResourceInfo } from './ResourceInfo';

export const Project = () => {
  const [resources, setResources] = React.useState<Resource[]>();
  const [selectedResource, setSelectedResource] = React.useState<Resource>();
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/project/515a6a4b008d432d8c9db97f56e51b79/resources`
      )
      .then((res) => {
        const resourcesData = res.data;
        setResources(resourcesData);
      });
  }, []);
  const onClickNode = (nodeId: string) => {
    setSelectedResource(resources?.find((r) => r.id === nodeId));
  };
  return (
    <Box padding={5} height="100vh">
      <Grid
        h="100%"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={5} bg="gray.900" rounded={'md'} />
        <GridItem rowSpan={4} colSpan={5}>
          <Network resources={resources} onClickNode={onClickNode} />
        </GridItem>
        <GridItem colSpan={5} bg="gray.900" rounded={'md'}>
          <ResourceInfo resource={selectedResource} />
        </GridItem>
      </Grid>
    </Box>
  );
};

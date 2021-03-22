import { Box, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Project } from '../types/Projects';
import { Resource } from '../types/Resources';
import { Network } from './Network';
import { ProjectSelectBar } from './ProjectSelectBar';
import { ResourceInfo } from './ResourceInfo';

const BASE_URL = 'http://localhost:8080';
const fetchProjectResources = (projectId: string) => {
  return axios.get(`${BASE_URL}/project/${projectId}/resources`);
};
const fetchAllProjects = () => {
  return axios.get<Project[]>(`${BASE_URL}/project/all`);
};

export const ProjectDashboard = () => {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [selectedResource, setSelectedResource] = React.useState<Resource>();
  const [selectedProject, setSelectedProject] = React.useState<Project>();

  React.useEffect(() => {
    if (selectedProject) {
      fetchProjectResources(selectedProject?.id).then((res) => {
        const resourcesData = res.data;
        setResources(resourcesData);
      });
    }
  }, [selectedProject]);

  React.useEffect(() => {
    fetchAllProjects().then((res) => {
      const projectsData = res.data;
      setProjects(projectsData);
      if (projectsData.length > 0) {
        setSelectedProject(projectsData[0]);
      }
    });
  }, []);

  const onSelectResource = (nodeId: string) => {
    setSelectedResource(resources.find((r) => r.id === nodeId));
  };
  const onSelectProject = (projectId: string) => {
    setSelectedProject(projects.find((p) => p.id === projectId));
  };

  return (
    <Box padding={5} height="100vh">
      <Grid
        h="100%"
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={6} bg="gray.900" rounded={'md'} overflowY="scroll">
          <ProjectSelectBar
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={onSelectProject}
          />
        </GridItem>
        <GridItem rowSpan={4} colSpan={5} position="relative">
          <Network resources={resources} onClickNode={onSelectResource} />
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={5}
          bg="gray.900"
          rounded={'md'}
          overflowY="hidden"
        >
          <ResourceInfo resource={selectedResource} />
        </GridItem>
      </Grid>
    </Box>
  );
};

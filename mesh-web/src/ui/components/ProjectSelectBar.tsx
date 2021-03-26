import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiArrowLeft, HiViewGridAdd } from 'react-icons/hi';
import { ProjectContext } from '../../stores/MeshContext';

export const ProjectSelectBar = observer(() => {
  
  const ProjectStore = React.useContext(ProjectContext);

  return (
    <Box>
      <Stack p={4} direction="column">
        <Heading color="gray.400" size="sm">
          Selected Project
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {ProjectStore.selectedProject
              ? ProjectStore.selectedProject.name
              : 'None'}
          </MenuButton>
          <MenuList>
            {ProjectStore.projects.map((p) => (
              <MenuItem
                key={p.id}
                onClick={() => {
                  ProjectStore.selectProject(p);
                }}
              >
                {p.name}
              </MenuItem>
            ))}
            <MenuDivider />
            <MenuItem icon={<HiViewGridAdd />} command="⌘N">
              New Project
            </MenuItem>
            <MenuItem icon={<HiArrowLeft />} command="⌘V">
              View All Projects
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
});

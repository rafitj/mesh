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
import React from 'react';
import { HiArrowLeft, HiViewGridAdd } from 'react-icons/hi';
import { Project } from '../../types/Projects';
interface ProjectSelectBarProps {
  projects: Project[];
  selectedProject?: Project;
  onProjectSelect: (id: string) => void;
}
export const ProjectSelectBar = ({
  projects,
  selectedProject,
  onProjectSelect,
}: ProjectSelectBarProps) => {
  return (
    <Box>
      <Stack p={4} direction="column">
        <Heading color="gray.400" size="sm">
          Selected Project
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedProject ? selectedProject.name : 'None'}
          </MenuButton>
          <MenuList>
            {projects.map((p) => (
              <MenuItem
                key={p.id}
                onClick={() => {
                  onProjectSelect(p.id);
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
};

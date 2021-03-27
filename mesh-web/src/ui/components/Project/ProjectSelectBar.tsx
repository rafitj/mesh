import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiArrowLeft, HiViewGridAdd } from 'react-icons/hi';
import { ProjectContext } from '../../../stores/MeshContext';
import { ProjectDialog } from './ProjectDialog';
import { ProjectInfo } from './ProjectInfo';
import { ProjectSettings } from './ProjectSettings';
import { ProjectSimController } from './ProjectSimController';
import { ProjectStats } from './ProjectStats';

export const ProjectSelectBar = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      />
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
              <MenuItem
                icon={<HiViewGridAdd />}
                command="⌘N"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                New Project
              </MenuItem>
              <MenuItem icon={<HiArrowLeft />} command="⌘V">
                View All Projects
              </MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Divider />
          <Spacer />
          <ProjectSimController />
          <Spacer />
          <Divider />
          <Spacer />
          <ProjectInfo />
          <Spacer />
          <Divider />
          <Spacer />
          <ProjectStats />
          <Spacer />
          <Divider />
          <Spacer />
          <ProjectSettings />
        </Stack>
      </Box>
    </>
  );
});

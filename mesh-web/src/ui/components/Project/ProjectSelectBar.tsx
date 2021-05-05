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
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiViewBoards, HiViewGridAdd } from 'react-icons/hi';
import { ProjectContext } from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';
import { ProjectDialog, ProjectDialogState } from './ProjectDialog';
import { ProjectInfo } from './ProjectInfo';
import { ProjectSettings } from './ProjectSettings';
import { ProjectSimController } from './ProjectSimController';
import { ProjectStats } from './ProjectStats';
import { UserControl } from './UserControl';

export const ProjectSelectBar = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogState, setDialogState] = React.useState<ProjectDialogState>(
    'CREATE'
  );
  const toast = useToast();
  return (
    <>
      <ProjectDialog
        changeToCreateMode={() => {
          setDialogState('CREATE');
        }}
        changeToEditMode={() => {
          setDialogState('EDIT');
        }}
        changeToViewMode={() => {
          setDialogState('VIEW');
        }}
        isOpen={isDialogOpen || ProjectStore.projects.length < 1}
        state={ProjectStore.projects.length < 1 ? 'CREATE' : dialogState}
        onClose={() => {
          if (ProjectStore.projects.length < 1) {
            toast({
              ...toastSettings,
              title: 'Create a project to get started',
              status: 'error',
            });
          }
          setIsDialogOpen(false);
        }}
      />
      <Box>
        <Stack p={4} direction="column">
          <UserControl />
          <Spacer />
          <Divider />
          <Spacer />
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
                  setDialogState('CREATE');
                  setIsDialogOpen(true);
                }}
              >
                New Project
              </MenuItem>
              <MenuItem
                icon={<HiViewBoards />}
                command="⌘V"
                onClick={() => {
                  setDialogState('VIEW');
                  setIsDialogOpen(true);
                }}
              >
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

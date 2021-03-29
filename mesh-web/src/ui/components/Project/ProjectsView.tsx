import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';

interface ProjectsViewProps {
  closeDialog: () => void;
  createProject: () => void;
  editProject: (projectId: string) => void;
}

export const ProjectsView = observer(
  ({ closeDialog, createProject, editProject }: ProjectsViewProps) => {
    const ProjectStore = React.useContext(ProjectContext);
    const [alertIsOpen, setAlertIsOpen] = React.useState(false);
    const [projectId, setProjectId] = React.useState<string>();
    const toast = useToast();
    const closeAlert = () => {
      setAlertIsOpen(false);
    };
    const deleteProject = () => {
      if (projectId) {
        ProjectStore.deleteProject(projectId).then(() => {
          toast({
            ...toastSettings,
            title: ProjectStore.statusMessage,
            status: ProjectStore.hasError ? 'error' : 'success',
          });
        });
        closeAlert();
      }
    };
    return (
      <>
        <AlertDialog
          isCentered={true}
          isOpen={alertIsOpen}
          leastDestructiveRef={undefined}
          onClose={closeAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="md" fontWeight="bold">
                Delete Project
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={closeAlert}>Cancel</Button>
                <Button colorScheme="red" onClick={deleteProject} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Stack spacing={4}>
          <Heading color="gray.400" size="sm">
            {`My Projects (${ProjectStore.projects.length})`}
          </Heading>
          {ProjectStore.projects.map((p) => (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              key={p.id + '-project-view'}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading color="gray.300" size="md">
                    {p.name}
                  </Heading>
                  <Text color="gray.500" fontSize="xs">
                    #{p.id}
                  </Text>
                </Box>
                <ButtonGroup>
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit Project"
                    size="sm"
                    onClick={() => {
                      editProject(p.id);
                    }}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete Project"
                    size="sm"
                    onClick={() => {
                      setProjectId(p.id);
                      setAlertIsOpen(true);
                    }}
                  />
                </ButtonGroup>
              </Flex>
            </Box>
          ))}
          <Divider />
          <ButtonGroup width="100%">
            <Button
              leftIcon={<AddIcon />}
              onClick={createProject}
              colorScheme="teal"
            >
              Create Project
            </Button>
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={closeDialog}
            >
              Back
            </Button>
          </ButtonGroup>
        </Stack>
      </>
    );
  }
);

import { LinkIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Heading,
  Stack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';

export const ProjectSettings = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
  const toast = useToast();
  const togglePrivacy = () => {
    if (ProjectStore.selectedProjectInfo) {
      const newProject = {
        ...ProjectStore.selectedProjectInfo,
        public: !ProjectStore.selectedProjectInfo?.public,
      };
      ProjectStore.updateProject(newProject);
    }
  };
  return (
    <>
      {ProjectStore.selectedProjectInfo && (
        <Stack spacing={3}>
          <Heading color="gray.400" size="sm">
            {ProjectStore.viewMode ? 'Project Share' : 'Share Settings'}
          </Heading>
          {!ProjectStore.viewMode && (
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  alignItems="center"
                  opacity={ProjectStore.selectedProjectInfo.public ? 0.5 : 1}
                >
                  <Badge>Private</Badge>
                  <LockIcon ml={2} />
                </Box>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  isChecked={ProjectStore.selectedProjectInfo.public}
                  onChange={togglePrivacy}
                />
                <Box
                  opacity={ProjectStore.selectedProjectInfo.public ? 1 : 0.5}
                >
                  <UnlockIcon mr={2} />
                  <Badge>Public</Badge>
                </Box>
              </Stack>
            </Box>
          )}
          <Text color="gray.500">
            {!ProjectStore.selectedProjectInfo.public
              ? 'This project is private and only you can see or edit it'
              : 'This project is public and anyone with a link can view but not edit it'}
          </Text>
          <Button
            isDisabled={!ProjectStore.selectedProjectInfo.public}
            colorScheme="teal"
            leftIcon={<LinkIcon />}
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/view/${ProjectStore.selectedProjectInfo?.slug}`
              );
              toast({
                ...toastSettings,
                title: 'Copied project link to clipboard',
                status: 'success',
              });
            }}
            variant="outline"
          >
            Copy Link
          </Button>
        </Stack>
      )}
    </>
  );
});

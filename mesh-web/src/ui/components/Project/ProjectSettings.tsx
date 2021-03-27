import { LinkIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Stack, Switch, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../../stores/MeshContext';

export const ProjectSettings = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);
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
        <Stack spacing={4}>
          <Heading color="gray.400" size="sm">
            Share Settings
          </Heading>
          <Box>
            <Stack direction="row" alignItems="center">
              <Text>
                {ProjectStore.selectedProjectInfo.public
                  ? 'Public Project'
                  : 'Private Project'}
              </Text>
              <LockIcon
                opacity={ProjectStore.selectedProjectInfo.public ? 0.5 : 1}
              />
              <Switch
                colorScheme="teal"
                size="lg"
                isChecked={ProjectStore.selectedProjectInfo.public}
                onChange={togglePrivacy}
              />
              <UnlockIcon
                opacity={ProjectStore.selectedProjectInfo.public ? 1 : 0.5}
              />
            </Stack>
          </Box>
          <Button
            isDisabled={!ProjectStore.selectedProjectInfo.public}
            colorScheme="teal"
            leftIcon={<LinkIcon />}
            variant="outline"
          >
            Copy Link
          </Button>
        </Stack>
      )}
    </>
  );
});

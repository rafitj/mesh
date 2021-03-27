import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { ProjectContext } from '../../../stores/MeshContext';

export const ProjectInfo = observer(() => {
  const ProjectStore = React.useContext(ProjectContext);

  return (
    <>
      {ProjectStore.selectedProjectInfo && (
        <Stack>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="gray.400" size="sm">
              Budget
            </Heading>
            <Box display="flex" alignItems="center">
              <Text>{`$ ${ProjectStore.selectedProjectInfo.budget}`}</Text>{' '}
              <Text px={2} color="gray.500">
                {' '}
                /month
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="gray.400" size="sm">
              Cost
            </Heading>
            <Box display="flex" alignItems="center">
              <Text>{`$ ${ProjectStore.resourceCost}`}</Text>{' '}
              <Text px={2} color="gray.500">
                {' '}
                /month
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="gray.400" size="sm">
              Resources
            </Heading>
            <Box display="flex" alignItems="center">
              <Text>{`${ProjectStore.numResources}`}</Text>{' '}
              <Text px={2} color="gray.500">
                {' '}
                total
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="gray.400" size="sm">
              Capacity
            </Heading>
            <Box display="flex" alignItems="center">
              <Text>{`~ 500`}</Text>{' '}
              <Text px={2} color="gray.500">
                {' '}
                users
              </Text>
            </Box>
          </Flex>
        </Stack>
      )}
    </>
  );
});

import { Popover } from '@chakra-ui/popover';
import {
  Box,
  Button,
  Center,
  Heading,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { CgData } from 'react-icons/cg';
import { HiCursorClick } from 'react-icons/hi';
import { NetworkContext } from '../../../stores/MeshContext';
import '../../styles/graph.css';

// TODO: Auto-scroll feedbox to bottom
export const LinkInfo = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  return (
    <Box position="absolute" right="0" bottom="0">
      <Popover placement={'top-start'} closeOnBlur={false}>
        <PopoverTrigger>
          <Button leftIcon={<CgData />}>View Connection Data</Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          {NetworkStore.focusLink ? (
            <>
              <PopoverHeader pt={3} fontWeight="bold" border="0">
                Link #{NetworkStore.focusLink.relationId}
                <Text fontSize="xs" color="blue.100" isTruncated={true}>
                  {`${NetworkStore.resources
                    .find((r) => r.id === NetworkStore.focusLink?.src)
                    ?.label.toUpperCase()} - ${NetworkStore.resources
                    .find((r) => r.id === NetworkStore.focusLink?.target)
                    ?.label.toUpperCase()}`}
                </Text>
                <Text fontSize="xs">
                  {NetworkStore.focusLink.latency} ms latency
                </Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Heading size="sm" color="gray.300" mb={1}>
                  Feed
                </Heading>

                <Box
                  maxHeight={100}
                  overflowY="scroll"
                  background="blue.900"
                  rounded="md"
                  p={2}
                  id={`${NetworkStore.focusLink.relationId}-feed`}
                >
                  {NetworkStore.pingFeed
                    .get(NetworkStore.focusLink.relationId)
                    ?.map((p) => (
                      <Text fontSize="xs" key={p.id}>
                        {p.msg}
                      </Text>
                    ))}
                </Box>
              </PopoverBody>
            </>
          ) : (
            <Center width="100%" height="100px">
              <Stack direction="row">
                <HiCursorClick color="#A0AEC0" />
                <Heading color="gray.400" size="sm">
                  Click a Connection
                </Heading>
              </Stack>
            </Center>
          )}
        </PopoverContent>
      </Popover>
    </Box>
  );
});

import { Popover } from '@chakra-ui/popover';
import {
  Box,
  Button,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { CgData } from 'react-icons/cg';
import { NetworkContext } from '../../../stores/MeshContext';
import '../../styles/graph.css';

export const LinkInfo = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  return (
    <Box position="absolute" right="0" bottom="0">
      <Popover placement={'top-start'} closeOnBlur={false}>
        <PopoverTrigger>
          <Button leftIcon={<CgData />}>View Connection Data</Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            Link {NetworkStore.focusLink?.relationId}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
});

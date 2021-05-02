import {
  Box,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { HiOutlineRefresh, HiServer } from 'react-icons/hi';
import '../../styles/override.css';
import { ConnectionForm } from '../Forms/ConnectionForm';
import { ResourceForm } from '../Forms/ResourceForm';
interface NetworkToolsProps {
  resetGraph: () => void;
}

export const NetworkTools = observer(({ resetGraph }: NetworkToolsProps) => {
  return (
    <Box position="absolute" right="0">
      <ButtonGroup>
        <Popover placement="left-end" size="md" id="chakra-popover">
          <PopoverTrigger>
            <IconButton aria-label="Add Server" icon={<HiServer />} />
          </PopoverTrigger>
          <PopoverContent p={3}>
            <PopoverArrow />
            <ResourceForm />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
        <Popover placement="left-end" size="md" id="chakra-popover">
          <PopoverTrigger>
            <IconButton
              aria-label="Add Connection"
              icon={<AiOutlineNodeIndex />}
            />
          </PopoverTrigger>
          <PopoverContent p={3}>
            <PopoverArrow />
            <ConnectionForm />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="Reset Graph"
          icon={<HiOutlineRefresh />}
          onClick={resetGraph}
        />
      </ButtonGroup>
    </Box>
  );
});

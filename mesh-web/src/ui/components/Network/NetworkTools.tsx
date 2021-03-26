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
import React from 'react';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { HiServer } from 'react-icons/hi';
import { Resource } from '../../../types/Resources';
import { ConnectionForm } from '../Forms/ConnectionForm';
import { ResourceForm } from '../Forms/ResourceForm';
import '../stylesheets/override.css';

interface NetworkToolProps {
  resources: Resource[];
}
export const NetworkTools = ({ resources }: NetworkToolProps) => {
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
            <ConnectionForm resources={resources} />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </Box>
  );
};

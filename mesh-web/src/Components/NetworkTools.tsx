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
import '../stylesheets/override.css';
import { ResourceForm } from './Forms/ResourceForm';

export const NetworkTools = () => {
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
        <IconButton aria-label="Add Connection" icon={<AiOutlineNodeIndex />} />
      </ButtonGroup>
    </Box>
  );
};

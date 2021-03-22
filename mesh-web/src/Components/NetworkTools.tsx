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
import { HiDatabase, HiDesktopComputer, HiServer } from 'react-icons/hi';

export const NetworkTools = () => {
  return (
    <Box position="absolute" right="0">
      <ButtonGroup>
        <Popover placement="left-end">
          <PopoverTrigger>
            <IconButton aria-label="Add Server" icon={<HiServer />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <PopoverArrow />
            {/* <ServerForm/> */}
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
        <IconButton aria-label="Add Database" icon={<HiDatabase />} />
        <IconButton aria-label="Add Client" icon={<HiDesktopComputer />} />
        <IconButton aria-label="Add Client" icon={<AiOutlineNodeIndex />} />
      </ButtonGroup>
    </Box>
  );
};

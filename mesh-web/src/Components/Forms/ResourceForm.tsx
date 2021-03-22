import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { HiDatabase, HiDesktopComputer, HiServer } from 'react-icons/hi';
import { IoIosRocket } from 'react-icons/io';
import { ResourceType } from '../../types/Resources';
import { ClientForm } from './ClientForm';
import { DatabaseForm } from './DatabaseForm';
import { ServerForm } from './ServerForm';

export const ResourceForm = () => {
  const [resourceType, setResourceType] = React.useState<ResourceType>(
    'SERVER'
  );
  const onSelectServer = () => {
    setResourceType('SERVER');
  };
  const onSelectClient = () => {
    setResourceType('CLIENT');
  };
  const onSelectDatabase = () => {
    setResourceType('DATABASE');
  };
  return (
    <FormControl id="resource-form" width="250px">
      <Stack>
        <Heading color="gray.400" size="sm">
          Create Resource
        </Heading>
        <Box>
          <FormLabel color="gray.500">Resource Name</FormLabel>
          <Input placeholder="e.g Analytics Resource" textAlign="center" />
        </Box>
        <Box width="100%">
          <FormLabel color="gray.500">Resource Type</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              width="100%"
            >
              {resourceType.charAt(0).toUpperCase() +
                resourceType.slice(1).toLowerCase()}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<HiServer />}
                command="⌘S"
                onClick={onSelectServer}
              >
                Server
              </MenuItem>
              <MenuItem
                icon={<HiDatabase />}
                command="⌘D"
                onClick={onSelectDatabase}
              >
                Database
              </MenuItem>
              <MenuItem
                icon={<HiDesktopComputer />}
                command="⌘C"
                onClick={onSelectClient}
              >
                Client
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box>
          <FormLabel color="gray.500">Resource Desc.</FormLabel>
          <Textarea placeholder="Description of resource purpose/usage" />
        </Box>
        <Spacer />
        <Divider />
        <Spacer />
        {resourceType === 'CLIENT' && <ClientForm />}
        {resourceType === 'DATABASE' && <DatabaseForm />}
        {resourceType === 'SERVER' && <ServerForm />}
        <Spacer />
        <Divider />
        <Spacer />
        <Button leftIcon={<IoIosRocket />} colorScheme="teal">
          Create
        </Button>
      </Stack>
    </FormControl>
  );
};

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
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { HiDatabase, HiDesktopComputer, HiServer } from 'react-icons/hi';
import { IoIosRocket } from 'react-icons/io';
import {
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
} from '../../../network/protos';
import { NetworkContext } from '../../../stores/MeshContext';
import { ResourceType } from '../../../types/Resources';
import { toastSettings } from '../../styles/components';
import { ClientForm } from './ClientForm';
import { DatabaseForm } from './DatabaseForm';
import { ServerForm } from './ServerForm';

export const ResourceForm = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const toast = useToast();
  const [resourceType, setResourceType] = React.useState<ResourceType>(
    'SERVER'
  );
  const [resourceLabel, setResourceLabel] = React.useState('');
  const [resourceDesc, setResourceDesc] = React.useState('');
  const [
    clientRequest,
    setClientRequest,
  ] = React.useState<CreateClientRequest>();
  const [
    serverRequest,
    setServerRequest,
  ] = React.useState<CreateServerRequest>();
  const [
    databaseRequest,
    setDatabaseRequest,
  ] = React.useState<CreateDatabaseRequest>();
  const onSelectServer = () => {
    setResourceType('SERVER');
  };
  const onSelectClient = () => {
    setResourceType('CLIENT');
  };
  const onSelectDatabase = () => {
    setResourceType('DATABASE');
  };
  const onChangeDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResourceDesc(e.target.value);
  };
  const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setResourceLabel(e.target.value);
  };
  const createResource = () => {
    if (resourceType === 'SERVER' && serverRequest) {
      NetworkStore.createServer(serverRequest).then(() => {
        toast({
          ...toastSettings,
          title: NetworkStore.statusMessage,
          status: NetworkStore.hasError ? 'error' : 'success',
        });
      });
    } else if (resourceType === 'DATABASE' && databaseRequest) {
      NetworkStore.createDatabase(databaseRequest).then(() => {
        toast({
          ...toastSettings,
          title: NetworkStore.statusMessage,
          status: NetworkStore.hasError ? 'error' : 'success',
        });
      });
    } else if (resourceType === 'CLIENT' && clientRequest) {
      NetworkStore.createClient(clientRequest).then(() => {
        toast({
          ...toastSettings,
          title: NetworkStore.statusMessage,
          status: NetworkStore.hasError ? 'error' : 'success',
        });
      });
    } else {
      toast({
        ...toastSettings,
        title: 'Failed to create resource - invalid resource type',
        status: 'error',
      });
    }
  };
  return (
    <FormControl id="resource-form" width="250px">
      <Stack>
        <Heading color="gray.400" size="sm">
          Create Resource
        </Heading>
        <Box>
          <FormLabel color="gray.500">Resource Name</FormLabel>
          <Input
            placeholder="e.g Analytics Resource"
            textAlign="center"
            onChange={onChangeLabel}
          />
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
            <MenuList width="100%">
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
          <FormLabel color="gray.500">Resource Description</FormLabel>
          <Textarea
            placeholder="Description of resource purpose/usage"
            onChange={onChangeDesc}
          />
        </Box>
        <Spacer />
        <Divider />
        <Spacer />
        {resourceType === 'CLIENT' && (
          <ClientForm
            description={resourceDesc}
            label={resourceLabel}
            onFormChange={setClientRequest}
          />
        )}
        {resourceType === 'DATABASE' && (
          <DatabaseForm
            description={resourceDesc}
            label={resourceLabel}
            onFormChange={setDatabaseRequest}
          />
        )}
        {resourceType === 'SERVER' && (
          <ServerForm
            description={resourceDesc}
            label={resourceLabel}
            onFormChange={setServerRequest}
          />
        )}
        <Spacer />
        <Divider />
        <Spacer />
        <Button
          leftIcon={<IoIosRocket />}
          colorScheme="teal"
          onClick={createResource}
        >
          Create
        </Button>
      </Stack>
    </FormControl>
  );
});

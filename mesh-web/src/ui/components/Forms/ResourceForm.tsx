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
  UpdateResourceRequest,
} from '../../../network/protos';
import { NetworkContext } from '../../../stores/MeshContext';
import { ResourceType } from '../../../types/Resources';
import { toastSettings } from '../../styles/components';
import { ClientForm } from './ClientForm';
import { DatabaseForm } from './DatabaseForm';
import { ServerForm } from './ServerForm';

interface ResourceFormProps {
  resource?: UpdateResourceRequest;
  onClose: () => void;
}

export const ResourceForm = observer(
  ({ resource, onClose }: ResourceFormProps) => {
    const NetworkStore = React.useContext(NetworkContext);
    const toast = useToast();
    const [resourceType, setResourceType] = React.useState<ResourceType>(
      resource?.type ?? 'SERVER'
    );
    const [resourceLabel, setResourceLabel] = React.useState(
      resource?.label ?? ''
    );
    const [resourceDesc, setResourceDesc] = React.useState(
      resource?.description ?? ''
    );
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
    React.useEffect(() => {
      if (resource) {
        if (resource.type === 'CLIENT') {
          setClientRequest((resource as unknown) as CreateClientRequest);
        } else if (resource.type === 'DATABASE') {
          setDatabaseRequest((resource as unknown) as CreateDatabaseRequest);
        } else {
          setServerRequest((resource as unknown) as CreateServerRequest);
        }
      }
    }, [resource]);
    const validateForm = () => {
      const validResource = resourceDesc !== '' && resourceLabel !== '';
      const validClientReq =
        clientRequest !== undefined &&
        Object.values(clientRequest).every((field) => field !== undefined);
      const validServerReq =
        serverRequest !== undefined &&
        Object.values(serverRequest).every((field) => field !== undefined);
      const validDBReq =
        databaseRequest !== undefined &&
        Object.values(databaseRequest).every((field) => field !== undefined);
      if (validResource && (validClientReq || validServerReq || validDBReq)) {
        return true;
      }
      toast({
        ...toastSettings,
        title: 'Form is incomplete',
        status: 'error',
      });
      return false;
    };
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
      if (!validateForm()) return;
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
      if (!NetworkStore.hasError) {
        onClose();
      }
    };
    const updateResource = () => {
      if (!validateForm() || !resource) return;
      if (resourceType === 'SERVER' && serverRequest) {
        NetworkStore.updateServer({ ...resource, ...serverRequest }).then(
          () => {
            toast({
              ...toastSettings,
              title: NetworkStore.statusMessage,
              status: NetworkStore.hasError ? 'error' : 'success',
            });
          }
        );
      } else if (resourceType === 'DATABASE' && databaseRequest) {
        NetworkStore.updateDatabase({ ...resource, ...databaseRequest }).then(
          () => {
            toast({
              ...toastSettings,
              title: NetworkStore.statusMessage,
              status: NetworkStore.hasError ? 'error' : 'success',
            });
          }
        );
      } else if (resourceType === 'CLIENT' && clientRequest) {
        NetworkStore.updateClient({ ...resource, ...clientRequest }).then(
          () => {
            toast({
              ...toastSettings,
              title: NetworkStore.statusMessage,
              status: NetworkStore.hasError ? 'error' : 'success',
            });
          }
        );
      } else {
        toast({
          ...toastSettings,
          title: 'Failed to create resource - invalid resource type',
          status: 'error',
        });
      }
      if (!NetworkStore.hasError) {
        onClose();
      }
    };
    return (
      <FormControl
        id="resource-form"
        width={resource ? '100%' : '250px'}
        isRequired={true}
      >
        <Stack>
          <Heading color="gray.400" size="sm">
            {resource ? 'Update' : 'Create'} Resource
          </Heading>
          <Box>
            <FormLabel color="gray.500">Resource Name</FormLabel>
            <Input
              placeholder="e.g Analytics Resource"
              textAlign="center"
              onChange={onChangeLabel}
              id="resource-name-input"
              defaultValue={resourceLabel}
            />
          </Box>
          <Box width="100%" display={resource ? 'none' : 'block'}>
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
              defaultValue={resourceDesc}
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
              data={clientRequest}
            />
          )}
          {resourceType === 'DATABASE' && (
            <DatabaseForm
              description={resourceDesc}
              label={resourceLabel}
              onFormChange={setDatabaseRequest}
              data={databaseRequest}
            />
          )}
          {resourceType === 'SERVER' && (
            <ServerForm
              description={resourceDesc}
              label={resourceLabel}
              onFormChange={setServerRequest}
              data={serverRequest}
            />
          )}
          <Spacer />
          <Divider />
          <Spacer />
          <Button
            leftIcon={<IoIosRocket />}
            colorScheme="teal"
            onClick={resource ? updateResource : createResource}
          >
            {resource ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </FormControl>
    );
  }
);

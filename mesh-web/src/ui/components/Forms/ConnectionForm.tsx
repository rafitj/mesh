import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiDatabase, HiDesktopComputer, HiServer } from 'react-icons/hi';
import { NetworkContext } from '../../../stores/MeshContext';
import { Resource } from '../../../types/Resources';
import { toastSettings } from '../../styles/components';

export const ConnectionForm = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const toast = useToast();
  const [resourceToConnect, setResourceToConnect] = React.useState<Resource>();
  const [connectedResources, setConnectedResources] = React.useState<
    { id: string; connected: boolean }[]
  >([]);

  const toggleConnection = (resource: Resource) => {
    if (resourceToConnect) {
      const isConnected =
        resource.connections.includes(resourceToConnect.id) ||
        resourceToConnect.connections.includes(resource.id);
      const serverId =
        resourceToConnect.type === 'SERVER'
          ? resourceToConnect.id
          : resource.id;
      const resourceId =
        resourceToConnect.type === 'SERVER'
          ? resource.id
          : resourceToConnect.id;
      const connectType =
        resourceToConnect.type === 'SERVER'
          ? resource.type
          : resourceToConnect.type;
      if (isConnected) {
        NetworkStore.disconnectResource({
          serverId,
          resourceId,
        }).then(() => {
          toast({
            ...toastSettings,
            title: NetworkStore.statusMessage,
            status: NetworkStore.hasError ? 'error' : 'success',
          });
        });
      } else {
        NetworkStore.connectResource(connectType, {
          latency: 100,
          serverId,
          resourceId,
        }).then(() => {
          toast({
            ...toastSettings,
            title: NetworkStore.statusMessage,
            status: NetworkStore.hasError ? 'error' : 'success',
          });
        });
      }
    }
  };

  React.useEffect(() => {
    if (resourceToConnect) {
      const resource = NetworkStore.resources.find(
        (r) => r.id === resourceToConnect.id
      );
      setConnectedResources(
        NetworkStore.resources.map((r) => ({
          id: r.id,
          connected:
            resource?.connections.includes(r.id) || r.id === resource?.id,
        }))
      );
    }
  }, [resourceToConnect, NetworkStore.links, NetworkStore.resources]);

  const updateResourceToConnect = (resource: Resource) => {
    setResourceToConnect(resource);
  };

  return (
    <FormControl id="resource-form" width="250px">
      <Stack>
        <Heading color="gray.400" size="sm">
          Create Connection
        </Heading>
        <Box width="100%">
          <FormLabel color="gray.500">Resource</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              width="100%"
            >
              {resourceToConnect
                ? resourceToConnect.label
                : 'Select a Resource'}
            </MenuButton>
            <MenuList width="100%">
              {NetworkStore.resources.map((r) => (
                <MenuItem
                  key={r.id + Math.random()}
                  icon={
                    r.type === 'CLIENT' ? (
                      <HiDesktopComputer />
                    ) : r.type === 'SERVER' ? (
                      <HiServer />
                    ) : (
                      <HiDatabase />
                    )
                  }
                  onClick={() => {
                    updateResourceToConnect(r);
                  }}
                >
                  {r.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        {resourceToConnect && (
          <>
            <Spacer />
            <Divider />
            <Spacer />
            <Box>
              <FormLabel color="gray.500">Resources to Connect</FormLabel>
              <Stack>
                {NetworkStore.resources
                  .filter(
                    (res) =>
                      res.type === 'SERVER' ||
                      resourceToConnect.type === 'SERVER'
                  )
                  .map((r) => (
                    <Checkbox
                      isDisabled={r === resourceToConnect}
                      key={r.id}
                      isChecked={
                        connectedResources.find((_r) => _r.id === r.id)
                          ?.connected
                      }
                      onChange={() => toggleConnection(r)}
                    >
                      {r.label}
                    </Checkbox>
                  ))}
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </FormControl>
  );
});

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
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import {
  HiDatabase,
  HiDesktopComputer,
  HiFire,
  HiServer,
} from 'react-icons/hi';
import { NetworkContext } from '../../../stores/MeshContext';
import { Resource } from '../../../types/Resources';

export const ConnectionForm = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const [resourceToConnect, setResourceToConnect] = React.useState<Resource>();
  const [connectedResources, setConnectedResources] = React.useState<
    { id: string; connected: boolean }[]
  >([]);

  const toggleConnection = (resourceId: string) => {
    const newConnectedResources = [...connectedResources];
    const indx = newConnectedResources.findIndex((r) => r.id === resourceId);
    newConnectedResources[indx].connected =
      resourceId === resourceToConnect?.id ||
      !newConnectedResources[indx].connected;
    setConnectedResources(newConnectedResources);
  };

  const updateResourceToConnect = (resource: Resource) => {
    setResourceToConnect(resource);
    setConnectedResources(
      NetworkStore.resources.map((r) => ({
        id: r.id,
        connected: resource.connections.includes(r.id) || r.id === resource.id,
      }))
    );
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
              {NetworkStore.resources.map((r, i) => (
                <MenuItem
                  key={r.id}
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
                {NetworkStore.resources.map((r, i) => (
                  <Checkbox
                    isDisabled={r === resourceToConnect}
                    key={r.id}
                    isChecked={
                      connectedResources.find((_r) => _r.id === r.id)?.connected
                    }
                    onChange={() => toggleConnection(r.id)}
                  >
                    {r.label}
                  </Checkbox>
                ))}
              </Stack>
            </Box>
            <Spacer />
            <Divider />
            <Spacer />
            <Button leftIcon={<HiFire />} colorScheme="teal">
              Save
            </Button>
          </>
        )}
      </Stack>
    </FormControl>
  );
});

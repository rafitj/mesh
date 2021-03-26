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
import React from 'react';
import {
  HiDatabase,
  HiDesktopComputer,
  HiFire,
  HiServer,
} from 'react-icons/hi';
import { Resource } from '../../../types/Resources';

interface ConnectionFormProps {
  resources: Resource[];
}
export const ConnectionForm = ({ resources }: ConnectionFormProps) => {
  const [resourceToConnect, setResourceToConnect] = React.useState<Resource>();
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
              {resources.map((r) => (
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
                    setResourceToConnect(r);
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
                {resources.map((r) => {
                  if (r === resourceToConnect) {
                    return <Checkbox isChecked={true}>{r.label}</Checkbox>;
                  } else {
                    return (
                      <Checkbox
                        defaultChecked={resourceToConnect?.connections.includes(
                          r.id
                        )}
                      >
                        {r.label}
                      </Checkbox>
                    );
                  }
                })}
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
};

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { SiAmazonaws, SiGooglecloud, SiMicrosoftazure } from 'react-icons/si';

type ServerProvider = 'AWS' | 'AZURE' | 'GCP';
type ServerInstance = { provider: ServerProvider; instanceType: string };
const InstanceList: ServerInstance[] = [
  { provider: 'AWS', instanceType: 'gxLarge' },
  { provider: 'AWS', instanceType: 'mdSmall' },
  { provider: 'AWS', instanceType: 'gxSmall' },
  { provider: 'GCP', instanceType: 'gxLarge' },
  { provider: 'GCP', instanceType: 'gxLarge' },
  { provider: 'AZURE', instanceType: 'med' },
];

export const ServerForm = () => {
  const [serverInstance, setServerInstance] = React.useState<ServerInstance>(
    InstanceList[2]
  );

  const getProviderIcon = (p: ServerProvider) => {
    if (p === 'AWS') {
      return <SiAmazonaws />;
    } else if (p === 'GCP') {
      return <SiGooglecloud />;
    } else {
      return <SiMicrosoftazure />;
    }
  };

  return (
    <Box width="100%">
      <FormLabel>
        <Heading color="gray.500" size="sm">
          Instance
        </Heading>
      </FormLabel>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
          {`${serverInstance.instanceType} (${serverInstance.provider})`}
        </MenuButton>
        <MenuList>
          {InstanceList.map((i) => (
            <MenuItem
              key={i.instanceType}
              icon={getProviderIcon(i.provider)}
              onClick={() => {
                setServerInstance(i);
              }}
            >
              {i.instanceType}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

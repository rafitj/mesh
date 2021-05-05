import {
  CheckIcon,
  ChevronDownIcon,
  NotAllowedIcon,
  SpinnerIcon,
} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import {
  HiCubeTransparent,
  HiDatabase,
  HiDesktopComputer,
  HiServer,
} from 'react-icons/hi';
import { ResourceType } from '../../../types/Resources';

export const ProjectStats = observer(() => {
  const [resourceType, setResourceType] = React.useState<ResourceType>();
  const onSelectServer = () => {
    setResourceType('SERVER');
  };
  const onSelectClient = () => {
    setResourceType('CLIENT');
  };
  const onSelectDatabase = () => {
    setResourceType('DATABASE');
  };
  const onSelectAll = () => {
    setResourceType(undefined);
  };
  return (
    <Stack spacing={3}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading color="gray.400" size="sm">
          Simulated Metrics
        </Heading>
        <Menu>
          <MenuButton size="xs" as={Button} rightIcon={<ChevronDownIcon />}>
            {resourceType
              ? `${resourceType.charAt(0).toUpperCase()}${resourceType
                  .slice(1)
                  .toLowerCase()}s`
              : 'All'}
          </MenuButton>
          <MenuList>
            <MenuItem icon={<HiCubeTransparent />} onClick={onSelectAll}>
              All Resources
            </MenuItem>
            <MenuItem icon={<HiServer />} onClick={onSelectServer}>
              Servers
            </MenuItem>
            <MenuItem icon={<HiDatabase />} onClick={onSelectDatabase}>
              Databases
            </MenuItem>
            <MenuItem icon={<HiDesktopComputer />} onClick={onSelectClient}>
              Clients
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
        <Badge
          display="flex"
          alignItems="center"
          colorScheme="green"
          mr={2}
          mt={2}
        >
          <Icon as={CheckIcon} /> 5 Alive
        </Badge>
        <Badge
          display="flex"
          alignItems="center"
          colorScheme="red"
          mr={2}
          mt={2}
        >
          <Icon as={NotAllowedIcon} /> 0 Dead
        </Badge>
        <Badge display="flex" alignItems="center" colorScheme="yellow" mt={2}>
          <Icon as={SpinnerIcon} /> 1 Paused
        </Badge>
      </Box>
      <StatGroup>
        <Stat>
          <StatLabel>Avg. Latency</StatLabel>
          <StatNumber>3.2ms</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Avg. Uptime</StatLabel>
          <StatNumber>99%</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
});

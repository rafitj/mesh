import {
  CheckIcon,
  ChevronDownIcon,
  NotAllowedIcon,
  SpinnerIcon,
} from '@chakra-ui/icons';
import {
  Badge,
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
    <Stack spacing={4}>
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
      <Stack direction="row">
        <Badge display="flex" alignItems="center" colorScheme="green">
          <Icon as={CheckIcon} mr={1} /> 5 Alive
        </Badge>
        <Badge display="flex" alignItems="center" colorScheme="red">
          <Icon as={NotAllowedIcon} mr={1} /> 0 Dead
        </Badge>
        <Badge display="flex" alignItems="center" colorScheme="yellow">
          <Icon as={SpinnerIcon} mr={1} /> 1 Paused
        </Badge>
      </Stack>
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
      <StatGroup>
        <Stat>
          <StatLabel>Avg. Efficiency</StatLabel>
          <StatNumber>39%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            3.23%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Avg. Delay</StatLabel>
          <StatNumber>0.1ms</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            0.07%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  );
});

import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import {
  HiCursorClick,
  HiDuplicate,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import ClientIcon from '../assets/ClientIcon.svg';
import DatabaseIcon from '../assets/DatabaseIcon.svg';
import ServerIcon from '../assets/ServerIcon.svg';
import '../stylesheets/graph.css';
import { Resource, ResourceType } from '../types/Resources';

interface NodeInfoProps {
  resource?: Resource;
}
const getResourceImage = (resourceType: ResourceType) => {
  if (resourceType === 'DATABASE') {
    return DatabaseIcon;
  } else if (resourceType === 'CLIENT') {
    return ClientIcon;
  } else {
    return ServerIcon;
  }
};
export const ResourceInfo = ({ resource }: NodeInfoProps) => {
  return (
    <Flex p={5} justifyContent="space-around" height="100%">
      {resource ? (
        <>
          <Box borderRadius="md" borderWidth="1px" maxW="300px">
            <Image
              width="100%"
              boxSize="125px"
              src={getResourceImage(resource.type)}
              alt={resource.type}
            />
            <Stack p="3" direction="column">
              <Box d="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  mr="2"
                >
                  {resource.type}
                </Box>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  ACTIVE
                </Badge>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated={true}
              >
                {resource.label.toUpperCase()}
              </Box>
              <Box>
                <Text color="gray.300" isTruncated={true}>
                  The purpose of this server is to interact with the core
                  database and analytics server to effectivley serialize the
                  datastream for machine learning applications
                </Text>
              </Box>
            </Stack>
          </Box>
          <Box borderRadius="md" borderWidth="1px" overflow="scroll">
            <Table variant="simple">
              <Thead>
                <Th>PROPERTY</Th>
                <Th>VALUE</Th>
              </Thead>
              <Tbody>
                {resource &&
                  Object.entries(resource).map(([key, value]) => {
                    return (
                      <Tr key={key}>
                        <Th>{key}</Th>
                        <Td>{value}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
              <Tfoot />
            </Table>
          </Box>
          <Box borderRadius="md" borderWidth="1px" p={3}>
            <Stack direction="column" spacing={4}>
              <Heading color="gray.400" size="xs">
                LIVE STATS
              </Heading>
              <Stat>
                <StatLabel>Latency</StatLabel>
                <StatNumber>21</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  3.2%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Uptime</StatLabel>
                <StatNumber>97.2%</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  0.11%
                </StatHelpText>
              </Stat>
            </Stack>
          </Box>
          <Box borderRadius="md" borderWidth="1px" p={3}>
            <Stack direction="column" spacing={4}>
              <Heading color="gray.400" size="xs">
                ACTIONS
              </Heading>
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="outline"
              >
                Edit Info
              </Button>
              <Button
                leftIcon={<HiOutlineLightningBolt />}
                colorScheme="yellow"
                variant="outline"
              >
                Toggle Live
              </Button>
              <Button
                leftIcon={<HiDuplicate />}
                colorScheme="purple"
                variant="outline"
              >
                Duplicate
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </>
      ) : (
        <Center width="100%">
          <Stack direction="row">
            <HiCursorClick color="#A0AEC0" />
            <Heading color="gray.400" size="sm">
              Click an Item
            </Heading>
          </Stack>
        </Center>
      )}
    </Flex>
  );
};

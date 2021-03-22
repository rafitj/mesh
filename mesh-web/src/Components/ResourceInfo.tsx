import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import '../stylesheets/graph.css';
import { Resource } from '../types/Resources';

interface NodeInfoProps {
  resource?: Resource;
}
export const ResourceInfo = ({ resource }: NodeInfoProps) => {
  return (
    <Flex p={5} justifyContent="space-between">
      <Box borderRadius="md" borderWidth="1px">
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
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
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
          <Button leftIcon={<DeleteIcon />} colorScheme="teal" variant="solid">
            Delete
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

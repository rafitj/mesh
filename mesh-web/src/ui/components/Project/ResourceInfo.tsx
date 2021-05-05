import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
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
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import {
  HiCursorClick,
  HiDuplicate,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { NetworkContext } from '../../../stores/MeshContext';
import { getResourceImg } from '../../../utils/helper';
import { toastSettings } from '../../styles/components';
import '../../styles/graph.css';
import { ResourceEditDialog } from '../Forms/ResourceEditDialog';

export const ResourceInfo = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toast = useToast();
  return (
    <>
      {NetworkStore.focusItem ? (
        <>
          <ResourceEditDialog
            resource={NetworkStore.focusItem}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
          <Grid
            height="100%"
            templateColumns="repeat(10, 1fr)"
            padding={3}
            gap={3}
          >
            <GridItem colSpan={2}>
              <Box
                borderRadius="md"
                borderWidth="1px"
                height="100%"
                maxW="300px"
              >
                <Image
                  width="100%"
                  boxSize="125px"
                  src={getResourceImg(NetworkStore.focusItem.type)}
                  alt={NetworkStore.focusItem.type}
                  fallbackSrc={'https://via.placeholder.com/150'}
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
                      {NetworkStore.focusItem.type}
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
                    {NetworkStore.focusItem.label.toUpperCase()}
                  </Box>
                  <Box>
                    <Text color="gray.300" isTruncated={true}>
                      {NetworkStore.focusItem.description}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </GridItem>
            <GridItem colSpan={4} overflowY="scroll">
              <Box borderRadius="md" borderWidth="1px" overflow="hidden">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>PROPERTY</Th>
                      <Th>VALUE</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.entries(NetworkStore.focusItem)
                      .filter((e) => e[0] !== 'connections')
                      .map(([key, value]) => {
                        return (
                          <Tr key={key}>
                            <Td>
                              <Text fontSize="sm" color="gray.400">
                                <strong>
                                  {key.charAt(0).toUpperCase() +
                                    key.substring(1)}
                                </strong>
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                fontSize="sm"
                                isTruncated={true}
                                maxWidth="15vw"
                              >
                                {value === null ? '?' : value.toString()}
                              </Text>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                  <Tfoot />
                </Table>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Box borderRadius="md" borderWidth="1px" p={3} height="100%">
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
            </GridItem>
            <GridItem colSpan={2}>
              <Box borderRadius="md" borderWidth="1px" p={3} height="100%">
                <Stack direction="column" spacing={4}>
                  <Heading color="gray.400" size="xs">
                    ACTIONS
                  </Heading>
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Edit Info
                  </Button>
                  <Tooltip
                    colorScheme="blackAlpha"
                    label="Coming Soon!"
                    aria-label="tooltip"
                    isOpen={tooltipOpen}
                  >
                    <Button
                      leftIcon={<HiOutlineLightningBolt />}
                      colorScheme="yellow"
                      variant="outline"
                      cursor="not-allowed"
                      opacity={0.25}
                      onMouseEnter={() => {
                        setTooltipOpen(true);
                      }}
                      onMouseLeave={() => {
                        setTooltipOpen(false);
                      }}
                    >
                      Toggle Live
                    </Button>
                  </Tooltip>
                  <Button
                    leftIcon={<HiDuplicate />}
                    colorScheme="purple"
                    variant="outline"
                    onClick={() =>
                      NetworkStore.focusItem &&
                      NetworkStore.duplicateResource(NetworkStore.focusItem)
                    }
                  >
                    Duplicate
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                      if (NetworkStore.focusItem) {
                        NetworkStore.deleteResource(
                          NetworkStore.focusItem
                        ).then(() => {
                          toast({
                            ...toastSettings,
                            title: NetworkStore.statusMessage,
                            status: NetworkStore.hasError ? 'error' : 'success',
                          });
                        });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
        </>
      ) : (
        <Center width="100%" height="100%">
          <Stack direction="row">
            <HiCursorClick color="#A0AEC0" />
            <Heading color="gray.400" size="sm">
              Click an Item
            </Heading>
          </Stack>
        </Center>
      )}
    </>
  );
});

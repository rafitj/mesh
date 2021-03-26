import {
  Box,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

export const ClientForm = () => {
  return (
    <Stack>
      <Box>
        <FormLabel>
          <Heading color="gray.500" size="sm">
            Throughput
          </Heading>
        </FormLabel>
        <NumberInput allowMouseWheel={true}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box>
        <FormLabel>
          <Heading color="gray.500" size="sm">
            Clickrate
          </Heading>
        </FormLabel>
        <NumberInput allowMouseWheel={true}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Stack>
  );
};

import { Box, Center, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface BlockViewProps {
  msg: string;
}

export const BlockView = observer(({ msg }: BlockViewProps) => {
  return (
    <Box width="100vw" height="100vh" background="gray.800">
      <Center
        width="100vw"
        height="100vh"
        position="absolute"
        zIndex={99}
        overflow={'hidden'}
        backgroundColor="gray.900"
        opacity={0.95}
      >
        <Stack textAlign="center" width="100%">
          <Icon
            as={BiErrorAlt}
            w={10}
            h={10}
            color="green.400"
            margin="0 auto"
          />
          <Heading>{msg}</Heading>
          <Text>
            Sorry but you can't view this project. Let's{' '}
            <Text display="inline" color="purple.300">
              <Link to="/home">
                {' '}
                <strong>return home</strong>
              </Link>
            </Text>
            .
          </Text>
        </Stack>
      </Center>
    </Box>
  );
});

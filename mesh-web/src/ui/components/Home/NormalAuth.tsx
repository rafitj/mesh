import { Button, HStack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { UserLogin } from './UserLogin';
import { UserSignup } from './UserSignup';

type AuthMode = 'LOGIN' | 'SIGNUP';

export const NormalAuth = observer(() => {
  const [authMode, setAuthMode] = React.useState<AuthMode>();
  return (
    <>
      {authMode === undefined && (
        <HStack justifyContent="center">
          <Button width="50%">Login</Button>
          <Button width="50%">Signup</Button>
        </HStack>
      )}
      {authMode === 'LOGIN' && (
        <>
          <UserLogin />
          <Button
            size="sm"
            colorScheme="blackAlpha"
            onClick={() => {
              setAuthMode('SIGNUP');
            }}
          >
            <Text fontSize="sm" cursor="pointer" color="purple.300">
              Actually, I'll sign up...
            </Text>
          </Button>
        </>
      )}
      {authMode === 'SIGNUP' && (
        <>
          <UserSignup />
          <Button
            size="sm"
            colorScheme="blackAlpha"
            onClick={() => {
              setAuthMode('LOGIN');
            }}
          >
            <Text fontSize="sm" cursor="pointer" color="purple.300">
              Actually, I'll login...
            </Text>
          </Button>
        </>
      )}
    </>
  );
});

import {
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../../stores/MeshContext';

interface ReturningAuthProps {
  onNotReturning: () => void;
}

export const ReturningAuth = observer(
  ({ onNotReturning }: ReturningAuthProps) => {
    const UserStore = React.useContext(UserContext);
    const history = useHistory();
    const [formError, setFormError] = React.useState('');
    const [enterPinMode, setEnterPinMode] = React.useState(false);
    const onComplete = (pin: string) => {
      UserStore.loginUser({ username: 'Rafit', pin }).then(() => {
        if (UserStore.hasError) {
          setFormError('Incorrect pin');
        }
      });
      history.push('/');
    };
    return (
      <>
        {enterPinMode ? (
          <HStack justifyContent="center">
            <PinInput
              size="sm"
              autoFocus={true}
              variant="filled"
              isInvalid={formError !== ''}
              onComplete={onComplete}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        ) : (
          <Button
            width="100%"
            onClick={() => {
              setEnterPinMode(true);
            }}
            autoFocus={true}
          >
            Welcome back Rafit
          </Button>
        )}
        <Button size="sm" colorScheme="blackAlpha" onClick={onNotReturning}>
          <Text fontSize="sm" cursor="pointer" color="purple.300">
            I'm not Rafit...
          </Text>
        </Button>
      </>
    );
  }
);

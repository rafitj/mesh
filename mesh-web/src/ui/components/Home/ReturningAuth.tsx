import {
  Box,
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
    const returningUser = UserStore.returningUsername || '';
    const history = useHistory();
    const [formError, setFormError] = React.useState('');
    const [enterPinMode, setEnterPinMode] = React.useState(false);
    const onComplete = (pin: string) => {
      UserStore.loginUser({ username: returningUser, password: pin }).then(
        () => {
          if (UserStore.hasError) {
            setFormError('Incorrect pin');
          } else {
            setFormError('');
            history.push('/');
          }
        }
      );
    };
    return (
      <>
        {enterPinMode ? (
          <>
            <HStack justifyContent="center">
              <PinInput
                size="md"
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
            <Box rounded="md" background="transparent" py={1}>
              {formError === '' && (
                <Text fontSize="sm" color="green.300">
                  Hi Rafit, enter your pin
                </Text>
              )}
              {formError !== '' && (
                <Text fontSize="sm" color="red.300">
                  {formError}
                </Text>
              )}
            </Box>
          </>
        ) : (
          <Button
            width="100%"
            onClick={() => {
              setEnterPinMode(true);
            }}
            autoFocus={true}
          >
            Welcome back {returningUser}
          </Button>
        )}
        <Button size="sm" colorScheme="blackAlpha" onClick={onNotReturning}>
          <Text fontSize="sm" cursor="pointer" color="purple.300">
            I'm not {returningUser}...
          </Text>
        </Button>
      </>
    );
  }
);

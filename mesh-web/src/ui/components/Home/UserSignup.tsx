import {
  Box,
  FormControl,
  HStack,
  IconButton,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { IoEnter } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { UserContext } from '../../../stores/MeshContext';

export const UserSignup = () => {
  const UserStore = React.useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [enterPinMode, setEnterPinMode] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const validateUsername = (u: string) => {
    if (/[^a-z]/i.test(u)) {
      setFormError('Invalid characters, only letters allowed');
    } else {
      setFormError('');
    }
  };
  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateUsername(e.target.value);
  };
  const onComplete = (pin: string) => {
    UserStore.signupUser({ username, pin }).then(() => {
      if (UserStore.hasError) {
        setFormError('Failed to create user');
      } else {
        history.push('/');
      }
    });
  };
  const onSubmit = () => {
    if (UserStore.checkUsernameAvailability(username)) {
      setFormError('');
      setEnterPinMode(true);
    } else {
      setFormError('Username already taken');
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <>
      <FormControl isInvalid={formError !== ''}>
        {!enterPinMode && (
          <>
            <Stack direction="row">
              <Input
                placeholder="Username (Rafit)"
                value={username}
                onChange={changeUsername}
                onKeyDown={handleEnter}
              />
              <IconButton
                icon={<IoEnter />}
                colorScheme="gray"
                type="submit"
                aria-label="Enter"
                size="md"
                disabled={username === '' || formError !== ''}
                onClick={onSubmit}
              />
            </Stack>
            <Box rounded="md" background="blackAlpha.200" py={1}>
              {username === '' && (
                <Text mt={2} fontSize="sm" color="green.300">
                  Create a dope username
                </Text>
              )}
              {formError === '' && username !== '' && (
                <Text mt={2} fontSize="sm" color="purple.300">
                  That's a pretty cool name
                </Text>
              )}
              {formError !== '' && (
                <Text mt={2} fontSize="sm" color="red.300">
                  {formError}
                </Text>
              )}
            </Box>
          </>
        )}
        {enterPinMode && (
          <>
            <HStack justifyContent="center">
              <PinInput
                size="sm"
                autoFocus={true}
                variant="filled"
                onComplete={onComplete}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Box rounded="md" background="blackAlpha.200" py={1}>
              {formError === '' && (
                <Text mt={2} fontSize="sm" color="green.300">
                  Create your pin
                </Text>
              )}
              {formError !== '' && (
                <Text mt={2} fontSize="sm" color="red.300">
                  {formError}
                </Text>
              )}
            </Box>
          </>
        )}
      </FormControl>
    </>
  );
};

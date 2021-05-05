import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
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
    } else if (u.length < 3 && u.length > 0) {
      setFormError('Username needs, at least 3 characters');
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
        setFormError('');
        history.push('/');
      }
    });
  };
  const onSubmit = async () => {
    const isAvailable = await UserStore.checkUsernameAvailability(username);
    if (isAvailable) {
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
                size="md"
              />
              <IconButton
                icon={<ArrowForwardIcon />}
                colorScheme="gray"
                type="submit"
                aria-label="Enter"
                size="md"
                disabled={username === '' || formError !== ''}
                onClick={onSubmit}
              />
            </Stack>
            <Box rounded="md" mt={2} background="transparent" py={1}>
              {username === '' && (
                <Text fontSize="sm" color="green.300">
                  Create a dope username
                </Text>
              )}
              {formError === '' && username !== '' && (
                <Text fontSize="sm" color="purple.300">
                  That's a pretty cool name
                </Text>
              )}
              {formError !== '' && (
                <Text fontSize="sm" color="red.300">
                  {formError}
                </Text>
              )}
            </Box>
          </>
        )}
        {enterPinMode && (
          <>
            <HStack justifyContent="center">
              <IconButton
                icon={<ArrowBackIcon />}
                colorScheme="gray"
                type="submit"
                aria-label="Back"
                size="md"
                onClick={() => {
                  setEnterPinMode(false);
                }}
              />
              <PinInput
                size="md"
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
            <Box rounded="md" mt={2} background="transparent" py={1}>
              {formError === '' && (
                <Text fontSize="sm" color="green.300">
                  Create your pin
                </Text>
              )}
              {formError !== '' && (
                <Text fontSize="sm" color="red.300">
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

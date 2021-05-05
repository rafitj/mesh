import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HiLogout } from 'react-icons/hi';
import { MdAccountBox } from 'react-icons/md';
import { useHistory } from 'react-router';
import { UserContext } from '../../../stores/MeshContext';

export const UserControl = observer(() => {
  const UserStore = React.useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    UserStore.logoutUser();
    history.push('/home');
  };

  return (
    <>
      <Heading color="gray.400" size="sm">
        Account
      </Heading>
      <Popover placement={'right'}>
        <PopoverTrigger>
          <Button leftIcon={<MdAccountBox />}>
            {UserStore.user?.username}
          </Button>
        </PopoverTrigger>
        <PopoverContent color="white" width="150px">
          <Button rightIcon={<HiLogout />} onClick={logout}>
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
});

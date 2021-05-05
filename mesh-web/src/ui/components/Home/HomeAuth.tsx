import { observer } from 'mobx-react';
import React from 'react';
import { UserContext } from '../../../stores/MeshContext';
import { NormalAuth } from './NormalAuth';
import { ReturningAuth } from './ReturningAuth';

export const HomeAuth = observer(() => {
  const UserStore = React.useContext(UserContext);
  const [isReturningUser, setIsReturningUser] = React.useState(
    UserStore.returningUser !== null
  );
  const onNotReturning = () => {
    setIsReturningUser(false);
    localStorage.clear();
  };
  return (
    <>
      {isReturningUser ? (
        <ReturningAuth onNotReturning={onNotReturning} />
      ) : (
        <NormalAuth />
      )}
    </>
  );
});

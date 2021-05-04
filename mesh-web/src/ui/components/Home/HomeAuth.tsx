import { observer } from 'mobx-react';
import React from 'react';
import { NormalAuth } from './NormalAuth';
import { ReturningAuth } from './ReturningAuth';

export const HomeAuth = observer(() => {
  const [isReturningUser, setIsReturningUser] = React.useState(true);
  const onNotReturning = () => {
    setIsReturningUser(false);
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

import {
  Badge,
  Button,
  ButtonGroup,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { IoMdPause, IoMdPlay, IoMdRefresh } from 'react-icons/io';
import { useStopwatch } from 'react-timer-hook';
import { NetworkContext } from '../../../stores/MeshContext';

export const ProjectSimController = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const [isSimulating, setIsSimulating] = React.useState(true);
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  const onToggle = () => {
    if (isSimulating) {
      pause();
      NetworkStore.pauseSimulation();
    } else {
      start();
      NetworkStore.playSimulation();
    }
    setIsSimulating(!isSimulating);
  };

  const onReset = () => {
    setIsSimulating(true);
    reset();
  };

  return (
    <Stack spacing={3}>
      <Heading color="gray.400" size="sm">
        Simulation
      </Heading>
      <Stack direction="row" alignItems="center">
        <Badge colorScheme={isSimulating ? 'green' : 'yellow'}>
          {isSimulating ? 'ACTIVE' : 'PAUSED'}
        </Badge>
        <Text color="gray.600">{`${
          isSimulating ? 'Simulating' : 'Simulated'
        } for ${minutes} min ${seconds} sec`}</Text>
      </Stack>
      <Progress size="xs" colorScheme="green" isIndeterminate={isSimulating} />
      <ButtonGroup>
        <Button
          leftIcon={isSimulating ? <IoMdPause /> : <IoMdPlay />}
          onClick={onToggle}
          size="sm"
        >
          {isSimulating ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={onReset} leftIcon={<IoMdRefresh />} size="sm">
          Reset
        </Button>
      </ButtonGroup>
    </Stack>
  );
});

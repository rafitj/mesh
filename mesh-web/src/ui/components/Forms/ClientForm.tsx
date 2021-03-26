import {
  Box,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { CreateClientRequest } from '../../../network/protos';
import { ProjectContext } from '../../../stores/MeshContext';

interface ClientFormProps {
  description: string;
  label: string;
  onFormChange: (s: CreateClientRequest) => void;
}
export const ClientForm = observer(
  ({ description, label, onFormChange }: ClientFormProps) => {
    const [throughput, setThroughput] = React.useState(1000);
    const [clickRate, setClickRate] = React.useState(1000);

    const ProjectStore = React.useContext(ProjectContext);
    const setForm = () => {
      if (ProjectStore.selectedProject) {
        onFormChange({
          description,
          label,
          throughput,
          clickRate,
          projectId: ProjectStore.selectedProject!.id,
        });
      }
    };
    React.useEffect(() => {
      setForm();
    });

    const onChangeThroughput = (_: string, t: number) => {
      setThroughput(t);
      setForm();
    };
    const onChangeClickRate = (_: string, t: number) => {
      setClickRate(t);
      setForm();
    };

    return (
      <Stack>
        <Box>
          <FormLabel>
            <Heading color="gray.500" size="sm">
              Throughput
            </Heading>
          </FormLabel>
          <NumberInput
            allowMouseWheel={true}
            onChange={onChangeThroughput}
            id="throughput-input"
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <FormLabel>
            <Heading color="gray.500" size="sm">
              Clickrate
            </Heading>
          </FormLabel>
          <NumberInput
            allowMouseWheel={true}
            onChange={onChangeClickRate}
            id="clickrate-input"
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Stack>
    );
  }
);

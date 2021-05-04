import {
  Box,
  FormLabel,
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
  data?: CreateClientRequest;
}
export const ClientForm = observer(
  ({ description, label, onFormChange, data }: ClientFormProps) => {
    const [throughput, setThroughput] = React.useState(data?.throughput ?? 100);
    const [clickRate, setClickRate] = React.useState(data?.clickRate ?? 100);

    const ProjectStore = React.useContext(ProjectContext);
    const setForm = () => {
      if (ProjectStore.selectedProject) {
        onFormChange({
          description,
          label,
          throughput,
          clickRate,
          projectId: ProjectStore.selectedProject!.id,
          type: 'CLIENT',
        });
      }
    };
    React.useEffect(() => {
      setForm();
    }, []);

    const onChangeThroughput = (_: string, t: number) => {
      setThroughput(isNaN(t) ? 0 : t);
      setForm();
    };
    const onChangeClickRate = (_: string, t: number) => {
      setClickRate(isNaN(t) ? 0 : t);
      setForm();
    };

    return (
      <Stack>
        <Box>
          <FormLabel color="gray.500">Throughput</FormLabel>
          <NumberInput
            allowMouseWheel={true}
            onChange={onChangeThroughput}
            id="throughput-input"
            aria-required={true}
            value={isNaN(throughput) ? 0 : throughput}
          >
            <NumberInputField textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <FormLabel color="gray.500">Clickrate</FormLabel>
          <NumberInput
            allowMouseWheel={true}
            onChange={onChangeClickRate}
            id="clickrate-input"
            aria-required={true}
            value={isNaN(clickRate) ? 0 : clickRate}
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

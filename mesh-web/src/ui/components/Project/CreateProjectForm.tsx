import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  useToast
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { IoIosRocket } from 'react-icons/io';
import { ProjectContext } from '../../../stores/MeshContext';
import { toastSettings } from '../../styles/components';

interface CreateProjectFormProps {
  closeDialog: () => void;
}

export const CreateProjectForm = observer(
  ({ closeDialog }: CreateProjectFormProps) => {
    const ProjectStore = React.useContext(ProjectContext);
    const toast = useToast();
    const [name, setName] = React.useState('');
    const [budget, setBudget] = React.useState(1000);
    const onChangeBudget = (_: string, t: number) => {
      setBudget(t);
    };
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
    const createProject = () => {
      ProjectStore.createProject({ budget, name }).then(() => {
        closeDialog();
        toast({
          ...toastSettings,
          title: ProjectStore.statusMessage,
          status: ProjectStore.hasError ? 'error' : 'success',
        });
      });
    };
    return (
      <FormControl id="create-project-form">
        <Stack>
          <Heading color="gray.400" size="sm">
            Create New Project
          </Heading>
          <Box>
            <FormLabel color="gray.500">Project Name</FormLabel>
            <Input
              placeholder="e.g Music Streaming Resource"
              textAlign="center"
              onChange={onChangeName}
              id="project-name-input"
            />
          </Box>
          <Box width="100%">
            <FormLabel color="gray.500">Project Budget</FormLabel>
            <NumberInput
              allowMouseWheel={true}
              onChange={onChangeBudget}
              id="budget-input"
            >
              <NumberInputField textAlign="center" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Spacer />
          <Divider />
          <Spacer />
          <Button
            leftIcon={<IoIosRocket />}
            colorScheme="teal"
            onClick={createProject}
          >
            Create
          </Button>
        </Stack>
      </FormControl>
    );
  }
);

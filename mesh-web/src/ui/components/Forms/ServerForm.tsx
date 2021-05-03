import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { SiAmazonaws, SiGooglecloud, SiMicrosoftazure } from 'react-icons/si';
import { CreateServerRequest } from '../../../network/protos';
import { ProjectContext } from '../../../stores/MeshContext';

type ServerProvider = 'AWS' | 'AZURE' | 'GCP';
type ServerInstance = { provider: ServerProvider; instanceType: string };
const InstanceList: ServerInstance[] = [
  { provider: 'AWS', instanceType: 'gxLarge' },
  { provider: 'AWS', instanceType: 'mdSmall' },
  { provider: 'AWS', instanceType: 'gxSmall' },
  { provider: 'GCP', instanceType: 'gxLarge' },
  { provider: 'GCP', instanceType: 'gxM' },
  { provider: 'AZURE', instanceType: 'med' },
];
interface ServerFormProps {
  description: string;
  label: string;
  onFormChange: (s: CreateServerRequest) => void;
}

export const ServerForm = observer(
  ({ onFormChange, description, label }: ServerFormProps) => {
    const ProjectStore = React.useContext(ProjectContext);
    const [serverInstance, setServerInstance] = React.useState<ServerInstance>(
      InstanceList[2]
    );
    const setForm = () => {
      if (ProjectStore.selectedProject) {
        onFormChange({
          description,
          label,
          instanceType: serverInstance.instanceType,
          projectId: ProjectStore.selectedProject!.id,
          type: 'SERVER',
        });
      }
    };
    React.useEffect(() => {
      setForm();
    });

    const getProviderIcon = (p: ServerProvider) => {
      if (p === 'AWS') {
        return <SiAmazonaws />;
      } else if (p === 'GCP') {
        return <SiGooglecloud />;
      } else {
        return <SiMicrosoftazure />;
      }
    };

    const onSelectInstance = (i: ServerInstance) => {
      setServerInstance(i);
      setForm();
    };

    return (
      <Box width="100%">
        <FormLabel color="gray.500">Instance</FormLabel>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
            {`${serverInstance.instanceType} (${serverInstance.provider})`}
          </MenuButton>
          <MenuList>
            {InstanceList.map((i) => (
              <MenuItem
                key={i.instanceType + i.provider}
                icon={getProviderIcon(i.provider)}
                onClick={() => {
                  onSelectInstance(i);
                }}
              >
                {i.instanceType}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  }
);

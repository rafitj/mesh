import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { HiOutlineRefresh, HiServer } from 'react-icons/hi';
import { ProjectContext } from '../../../stores/MeshContext';
import '../../styles/override.css';
import { ConnectionForm } from '../Forms/ConnectionForm';
import { ResourceForm } from '../Forms/ResourceForm';
interface NetworkToolsProps {
  resetGraph: () => void;
}

export const NetworkTools = observer(({ resetGraph }: NetworkToolsProps) => {
  const ProjectStore = React.useContext(ProjectContext);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {!ProjectStore.viewMode && (
        <Box position="absolute" right="0">
          <ButtonGroup>
            <Popover
              placement="left-end"
              size="md"
              id="chakra-popover"
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            >
              <PopoverTrigger>
                <Button
                  leftIcon={<HiServer />}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add Resource
                </Button>
              </PopoverTrigger>
              <PopoverContent p={3}>
                <PopoverArrow />
                <ResourceForm
                  onClose={() => {
                    setIsOpen(false);
                  }}
                />
                <PopoverCloseButton />
              </PopoverContent>
            </Popover>
            <Popover placement="left-end" size="md" id="chakra-popover">
              <PopoverTrigger>
                <Button leftIcon={<AiOutlineNodeIndex />}>Add Link</Button>
              </PopoverTrigger>
              <PopoverContent p={3}>
                <PopoverArrow />
                <ConnectionForm />
                <PopoverCloseButton />
              </PopoverContent>
            </Popover>
            <Button leftIcon={<HiOutlineRefresh />} onClick={resetGraph}>
              Reset View
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </>
  );
});

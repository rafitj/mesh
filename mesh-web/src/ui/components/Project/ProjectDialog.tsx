import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { CreateProjectForm } from './CreateProjectForm';

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDialog = observer(
  ({ isOpen, onClose }: ProjectDialogProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalCloseButton />
          <ModalBody>
            <CreateProjectForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

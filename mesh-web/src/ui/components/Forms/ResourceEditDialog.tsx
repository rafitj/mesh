import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { Resource } from '../../../types/Resources';

interface ResourceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource;
}

export const ResourceEditDialog = observer(
  ({ isOpen, onClose, resource }: ResourceEditDialogProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

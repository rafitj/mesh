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
import { EditProjectForm } from './EditProjectForm';
import { ProjectsView } from './ProjectsView';

export type ProjectDialogState = 'VIEW' | 'CREATE' | 'EDIT';
interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  state: ProjectDialogState;
  changeToCreateMode: () => void;
  changeToViewMode: () => void;
  changeToEditMode: () => void;
}

export const ProjectDialog = observer(
  ({
    isOpen,
    onClose,
    state,
    changeToCreateMode,
    changeToViewMode,
    changeToEditMode,
  }: ProjectDialogProps) => {
    const [editProjectId, setEditProjectId] = React.useState("")
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalCloseButton />
          <ModalBody>
            {state === 'CREATE' && <CreateProjectForm closeDialog={onClose} />}
            {state === 'VIEW' && (
              <ProjectsView
                createProject={changeToCreateMode}
                editProject={(id: string) => {
                  setEditProjectId(id)
                  changeToEditMode()
                }}
                closeDialog={onClose}
              />
            )}
            {state === 'EDIT' && (
              <EditProjectForm
                projectId={editProjectId}
                viewProjects={changeToViewMode}
                closeDialog={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

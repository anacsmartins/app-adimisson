import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Button, ButtonPrimary } from '../Buttons';

interface ModalComponentProps {
  title: string;
  body: string;
  isOpen: boolean;
  labelCloseBtn: string;
  labelSubmitBtn: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ title, body, isOpen, labelSubmitBtn, 
  labelCloseBtn, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {body}
        </ModalBody>

        <ModalFooter>
          <ButtonPrimary
            onClick={onClose}
            ml='12px'
          >
            {labelCloseBtn}
          </ButtonPrimary>
          <Button
            onClick={onSubmit}
            ml='12px'
          >
            {labelSubmitBtn}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;

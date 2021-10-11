import { ReactNode } from "react";
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'

import { Container} from './styles'
import { CreateMenu } from '../../pages/Menus/Create'

interface PopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export function Popup({ isOpen, onRequestClose, children }: PopupProps) {
  return (
    <Modal isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      shouldCloseOnOverlayClick={false}
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Close Modal" />
      </button>
      <Container>
        {children}
      </Container>
    </Modal>
  )
}
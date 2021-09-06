import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'

import { Container, Select} from './styles'
import { useMenus } from '../../hooks/useMenus'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createMenu } = useMenus()

  const [name, setName] = useState('');
  const [application, setApplication] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createMenu({ name, application });
    setName('');
    setApplication('deposit');
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>New Menu</h2>
        <input placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
        <Select value={application} onChange={event => setApplication(event.target.value)}>
          <option value="" hidden>
            Application
          </option>
          <option value="IB">IB</option>
          <option value="IOS">IOS</option>
          <option value="Android">Android</option>
        </Select>
        <button type="submit">Add</button>
      </Container>
    </Modal>
  )
}
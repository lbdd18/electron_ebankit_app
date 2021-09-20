import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'

import { Container} from './styles'
import { useMenus } from '../../hooks/useMenus'
import { Box, MenuItem, TextField } from '@material-ui/core'
import { Button } from '../Button'

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
    setApplication('');
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
        <Box paddingBottom={2}>
          <TextField fullWidth variant='outlined' label='Name' value={name} onChange={event => setName(event.target.value)} />
        </Box>
        <Box>
          <TextField fullWidth={true} variant="outlined" name="application" type="text" label="Application" select={true} onChange={event => setApplication(event.target.value)}>
            <MenuItem value="f04f94ee-6589-46fb-8d3a-bf1ed0a0bdba">IB</MenuItem>
            <MenuItem value="a0bc5b1c-dfad-4546-b05b-144cd4cb6c46">IOS</MenuItem>
            <MenuItem value="1acd96e0-ce45-40bc-9138-b33c66e47a6d">Android</MenuItem>
          </TextField>
        </Box>
        <Button type="submit" variant='contained' color='primary'>Add</Button>
      </Container>
    </Modal>
  )
}
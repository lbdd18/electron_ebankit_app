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
            <MenuItem value="15d49ca4-7f8f-4607-93b6-9b427e848e4b">IB</MenuItem>
            <MenuItem value="bcb9f215-d5ad-447b-8750-e68c2eaa28e2">IOS</MenuItem>
            <MenuItem value="669306a2-a360-4458-8fb8-46300f7fe830">Android</MenuItem>
          </TextField>
        </Box>
        <Button type="submit" variant='contained' color='primary'>Add</Button>
      </Container>
    </Modal>
  )
}
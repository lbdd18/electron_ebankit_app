import { useState } from 'react';

import { MenusProvider } from '../../hooks/useMenus';

import {NewTransactionModal} from '../../components/NewTransactionModal'
import {TransactionsTable} from '../../components/TransactionsTable'
import { Button } from '../../components/Button';
import { ButtonContainer, Container, TableContainer, Title } from './styles';

export function Menus() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <MenusProvider>
      <Container>
        <Title>Menus</Title>
        <TableContainer>
          <TransactionsTable />
        </TableContainer>
        <ButtonContainer>
          <Button onClick={handleOpenNewTransactionModal}>New Menu</Button>
        </ButtonContainer>
      </Container>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
    </MenusProvider>
  )
}
 

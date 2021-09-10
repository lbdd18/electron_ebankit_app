import { useState } from 'react';

import { MenusProvider, useMenus } from '../../hooks/useMenus';

import {NewTransactionModal} from '../../components/NewTransactionModal'
import { Button } from '../../components/Button';
import { ButtonContainer, Container, TableContainer, Title } from './styles';
import { TransactionsTable } from '../../components/TransactionsTable';


export function Menus() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const { menus } = useMenus();

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  
  console.log("My Menus-",menus);


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
 

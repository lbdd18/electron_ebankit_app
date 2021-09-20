import { useState } from 'react';

import { MenusProvider } from '../../hooks/useMenus';

import {NewTransactionModal} from '../../components/NewTransactionModal'
import { Button } from '../../components/Button';
import { ButtonContainer, Container, TableContainer, Title, ContainerHeader } from './styles';
import { DataGrid } from '../../components/DataGrid';

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
        <ContainerHeader>
        <Title>Menus</Title>
        <ButtonContainer>
          <Button color="primary" variant="contained" onClick={handleOpenNewTransactionModal}>New Menu</Button>
        </ButtonContainer>
          </ContainerHeader>
        <TableContainer>
          <DataGrid/>
        </TableContainer>
      </Container>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
    </MenusProvider>
  )
}
 

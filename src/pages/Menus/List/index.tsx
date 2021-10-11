import { useState } from 'react';

import { useMenus } from '../../../hooks/useMenus';

import {Popup} from '../../../components/Popup'
import { Button } from '../../../components/Button';
import { ButtonContainer, Container, TableContainer, Title, ContainerHeader } from './styles';
import { DataGrid } from '../../../components/DataGrid';
import { Grid, IconButton } from '@material-ui/core';
import * as FaIcons from "react-icons/fa"
import { CreateMenu } from '../Create';

export function ListMenus() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const { menus, deleteMenu, exportMenu } = useMenus();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'applicationName',
      headerName: 'Application',
      flex: 1,
      valueFormatter: (params) => params.row?.application?.name 
    },
    {
      field: 'id',
      headerName: "Actions",
      flex:1,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        return (
          <Grid container spacing={2}>
            <Grid item>
              <IconButton aria-label="export" color="default" onClick={()=>exportMenu(params.id)}>
                <FaIcons.FaFileExport fontSize="medium"/>
              </IconButton>              
            </Grid>
            <Grid item>
              <IconButton aria-label="delete" color="default" onClick={()=>deleteMenu(params.id)}>
                <FaIcons.FaTrash fontSize="medium"/>
              </IconButton>            
            </Grid>
          </Grid>
        );
      }
    }
  ];

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  
  return (
      <Container>
        <ContainerHeader>
        <Title>Menus</Title>
        <ButtonContainer>
          <Button color="primary" variant="contained" onClick={handleOpenNewTransactionModal}>New Menu</Button>
        </ButtonContainer>
          </ContainerHeader>
        <TableContainer>
          <DataGrid columns={columns} rows={menus}/>
        </TableContainer>
        <Popup isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} >
          <CreateMenu onRequestClose={handleCloseNewTransactionModal} />
        </Popup>
      </Container>
  )
}
 

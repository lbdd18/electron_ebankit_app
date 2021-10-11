
import { useState } from 'react';
import {Button, Grid, Box, IconButton} from '@material-ui/core'
import * as FaIcons from 'react-icons/fa';
import { DataGrid } from '../../components/DataGrid';
import { Popup } from '../../components/Popup';
import { useVersionSettings } from '../../hooks/useVersionSettings';

import { Container, Title } from "./styles";
import { CreateVersionSetting } from './CreateVersionSetting';

export function AdminPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { versionSettings, deleteVersionSetting } = useVersionSettings();

  const columns = [
    {
      field: 'version',
      headerName: 'Version',
      flex: 1
    },
    {
      field: 'id',
      headerName: "Actions",
      flex:0.25,
      disableClickEventBubbling: true,
      renderCell: (params: any) => {
        return (
          <Grid container>
            <Grid item>
              <IconButton aria-label="delete" color="default" onClick={()=>deleteVersionSetting(params.id)}>
                <FaIcons.FaTrash fontSize="medium"/>
              </IconButton>            
            </Grid>
          </Grid>
        );
      }
    }
  ];

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <Container>
      <Grid container direction='column'>
        <Grid container direction='row'>
          <Grid item xs={6}>
            <Box>
              <Title>Admin panel</Title>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleOpenModal} >Add Version Settiing</Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box marginTop={2}>
            <DataGrid columns={columns} rows={versionSettings}/>
          </Box>          
        </Grid>
      </Grid>
      <Popup isOpen={isModalOpen} onRequestClose={handleCloseModal} >
          <CreateVersionSetting onRequestClose={handleCloseModal} />
        </Popup>
    </Container>
  )
}
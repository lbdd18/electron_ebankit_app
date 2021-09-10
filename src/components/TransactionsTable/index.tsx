import {IconButton, Grid} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'

import * as FaIcons from "react-icons/fa"

import { useMenus } from "../../hooks/useMenus";

import { Container } from "./styles";


export function TransactionsTable() {
  const { menus, deleteMenu, exportMenu } = useMenus();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'application',
      headerName: 'Application',
      flex: 1,
    },
    {
      field: "",
      headerName: "Action",
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

  return (
    <Container>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={menus}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        disableColumnMenu 
      />
    </div>
    </Container>
  )
}
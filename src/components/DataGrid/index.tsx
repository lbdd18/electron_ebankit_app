import {IconButton, Grid, makeStyles} from '@material-ui/core'
import {createStyles} from '@material-ui/styles'
import {useGridSlotComponentProps} from '@material-ui/data-grid'
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import * as FaIcons from "react-icons/fa"

import { useMenus } from "../../hooks/useMenus";

import { Container, DataGridContainer } from "./styles";

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        color: theme.palette.text.primary,
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.background.paper,
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid ${
            theme.palette.background.paper
          }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.background.paper
          }`,
        },
        '& .MuiDataGrid-cell': {
          color: theme.palette.text.primary
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        }
      }
    })
);

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page+1}
      count={state.pagination.pageCount}
      renderItem={(props2) => <PaginationItem {...props2} />}
      onChange={(event, value) => {apiRef.current.setPage(value-1);console.log(state.pagination.page)}}
    />
  );
}

export function DataGrid() {
  const { menus, deleteMenu, exportMenu } = useMenus();
  const classes = useStyles();
  console.log(menus);
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

  return (
    <Container>
      <div style={{ height: 400, width: '100%' }}>
      <DataGridContainer
        className={classes.root}
        rows={menus}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu 
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
    </Container>
  )
}
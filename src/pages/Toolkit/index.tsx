
import {Box, Grid, MenuItem, Tab} from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { DataGrid } from '../../components/DataGrid';
import { Input } from '../../components/Input';
import { useThemes } from '../../hooks/useThemes';
import { Container, Title } from "./styles";

export function Toolkit() {
  const [value, setValue] = useState('1');
  const {changeTheme} = useThemes();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    {
      field: 'column1',
      headerName: 'Column 1',
      flex: 1
    },
    {
      field: 'column2',
      headerName: 'Column 2',
      flex: 1,
    }
  ];

  const rows = [
    {
      id: "id",
      column1: "text column 1",
      column2: "text column 2"
    }
  ]

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Title>Toolkit</Title>
        </Grid>
        <Grid item xs={6} >
          <Box display='flex' justifyContent='flex-end'>
            <Button variant="contained" color="primary" onClick={changeTheme} >Switch theme</Button>
          </Box>
        </Grid>
        <Grid item xs={12}> 
          <Box sx={{ width: '100%'}} marginTop={'1rem'}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" textColor='primary' indicatorColor='primary'>
                  <Tab label="Buttons" value="1" />
                  <Tab label="Inputs" value="2" />
                  <Tab label="Data Grid" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
              <Grid container spacing={2}>
                <Grid item>              
                  <Button variant="contained" onClick={() => console.log('Button')}>Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="outlined" onClick={() => console.log('Button')}>Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="contained" disabled onClick={() => console.log('Button')}>Button</Button>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>              
                  <Button variant="contained" color="primary" onClick={() => console.log('Primary Button')}>Primary Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="outlined" color="primary" onClick={() => console.log('Secondary Button')}>Primary Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="contained" disabled color="primary" onClick={() => console.log('Primary Button')}>Primary Button</Button>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>              
                  <Button variant="contained" color="secondary" onClick={() => console.log('Secondary Button')}>Secondary Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="outlined" color="secondary" onClick={() => console.log('Secondary Button')}>Secondary Button</Button>
                </Grid>
                <Grid item>              
                  <Button variant="contained" disabled color="secondary" onClick={() => console.log('Secondary Button')}>Secondary Button</Button>
                </Grid>
              </Grid>
            </TabPanel>
              <TabPanel value="2">
                <Grid container spacing={2}>
                  <Grid item>              
                    <Input label="Label"/>
                  </Grid>
                  <Grid item>              
                    <Input label="Password" type='password' />
                  </Grid>
                  <Grid item>              
                    <Input label="Number" type='Number'/>
                  </Grid>
                  <Grid item>              
                    <Input label="Select" select={true} defaultValue="option1">
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                    </Input>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <DataGrid columns={columns} rows={rows}/>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
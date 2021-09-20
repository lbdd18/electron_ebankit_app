
import {Box, Grid, Tab, TextField} from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Container, Title } from "./styles";

export function Toolkit() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid >
        <Grid item>
          <Title>Toolkit</Title>
        </Grid>
        <Grid item> 
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
                  <TextField label="Label"/>
                </Grid>
                <Grid item>              
                  <TextField label="Password" type='password' />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">

            </TabPanel>
          </TabContext>
        </Box>
      
        </Grid>
      </Grid>
    </Container>
  )
}
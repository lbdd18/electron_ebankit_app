import { useProjects } from '../../../hooks/useProjects';

import {Box, Card, CardMedia, CardContent, CardActions, Typography, Button, CircularProgress} from '@material-ui/core'
import {Chip} from '@mui/material'
import { ButtonContainer, Container, ContainerHeader, TableContainer, Title, Logo } from './styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import os from 'os'

export function ListProjects() {
  const { projects, installProject } = useProjects();
  const [isInstalling, setIsInstalling] = useState('');

  async function handleInstallProject(project:any){
    try {
      setIsInstalling(project.id);
      await installProject(project);
      setIsInstalling('');
    } catch (error) {
      setIsInstalling('');
    }
  }
  
  return (
      <Container>
        <ContainerHeader>
        <Title>Projects</Title>
        <ButtonContainer>
        <Link to="createProject" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">New Project</Button>
        </Link>
        </ButtonContainer>
          </ContainerHeader>
        <TableContainer>
          {projects.map(project=> {
            return (
              <Box paddingRight={2} key={project.id} width="300px">
                <Card style={{height: '285px'}}>
                  <CardMedia component={()=><Logo alt='project'/>}/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" >
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {(os.platform() !== 'darwin' && !project.isInstalledWindows) || (os.platform() === 'darwin' && !project.isInstalledMac) ? 
                    (
                      <Button size="small" startIcon={isInstalling === project.id ? <CircularProgress size='1rem'/> : null} disabled={isInstalling === project.id} variant="contained" onClick={()=> handleInstallProject(project)}>
                      {isInstalling === project.id ? 'Installing' :  'Install'}
                    </Button>
                    ) : ( <Chip size="medium" label="Installed" color="success" />)}
                    
                  </CardActions>
                </Card>
              </Box>
            )
          })}
        </TableContainer>
      </Container>
  )
}
 

import { useProjects } from '../../../hooks/useProjects';

import {Grid, Box, Card, CardMedia, CardContent, CardActions, Typography, Button, CircularProgress, IconButton} from '@material-ui/core'
import {Chip} from '@mui/material'
import {Menu , MenuItem , Divider} from '@mui/material';

import { ButtonContainer, Container, ContainerHeader, TableContainer, Title, Logo, MenuItemContainer, MenuItemText } from './styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import os from 'os'
import { FiMoreVertical, FiShare, FiTrash, FiGrid } from 'react-icons/fi';

export function ListProjects() {
  const { projects, installProject } = useProjects();
  const [isInstalling, setIsInstalling] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (project:any) => {
    console.log("Delete Project...", project.id)
    setAnchorEl(null);
  };

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
                    <Grid container >
                      <Grid item xs={11}>
                      {(os.platform() !== 'darwin' && !project.isInstalledWindows) || (os.platform() === 'darwin' && !project.isInstalledMac) ? 
                    (
                      <Button size="small" startIcon={isInstalling === project.id ? <CircularProgress size='1rem'/> : null} disabled={isInstalling === project.id} variant="contained" onClick={()=> handleInstallProject(project)}>
                      {isInstalling === project.id ? 'Installing' :  'Install'}
                    </Button>
                    ) : ( <Chip size="medium" label="Installed" color="success" />)}
                      </Grid>
                      <Grid item xs={1} style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <IconButton size="small" aria-label="more" id="long-button" aria-controls="long-menu" aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}>
                          <FiMoreVertical />
                        </IconButton>
                        <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'long-button',}}>
                          <MenuItem onClick={handleClose}>
                            <MenuItemContainer>
                              <FiShare />
                              <MenuItemText>Update</MenuItemText>
                            </MenuItemContainer>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <MenuItemContainer>
                              <FiGrid />
                              <MenuItemText>Marketplace</MenuItemText>
                            </MenuItemContainer>
                          </MenuItem>
                          <Divider sx={{ my: 0.5 }} />
                          <MenuItem onClick={()=>{handleDelete(project)}}>
                            <MenuItemContainer>
                              <FiTrash />
                              <MenuItemText>Delete</MenuItemText>
                            </MenuItemContainer>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Box>
            )
          })}
        </TableContainer>
      </Container>
  )
}
 

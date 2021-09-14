import { useProjects } from '../../../hooks/useProjects';

import {Box, Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core'

import { ButtonContainer, Container, TableContainer, Title } from './styles';
import { Link } from 'react-router-dom';

export function ListProjects() {
  const { projects, installProject } = useProjects();
  
  return (
      <Container>
        <Title>Projects</Title>
        <TableContainer>
          {projects.map(project=> {
            return (
              <Box paddingRight={2} key={project.id} maxWidth="300px">
                <Card>
                  <CardMedia component="img" height="140" image="https://viagemeturismo.abril.com.br/wp-content/uploads/2011/09/14725706608_06a62c13c6_k.jpg" alt="green iguana"/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" >
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="secondary">Select</Button>
                    <Button size="small" onClick={()=> installProject(project)}>Install</Button>
                  </CardActions>
                </Card>
              </Box>
            )
          })}
        </TableContainer>
        <ButtonContainer>
        <Link to="createProject" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">New Project</Button>
        </Link>
        </ButtonContainer>
      </Container>
  )
}
 

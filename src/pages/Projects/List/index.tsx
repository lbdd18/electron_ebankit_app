import { ProjectsProvider, useProjects } from '../../../hooks/useProjects';

import { Button } from '../../../components/Button';
import { ButtonContainer, Container, TableContainer, Title } from './styles';
import { Link } from 'react-router-dom';

export function Projects() {
  const { projects } = useProjects();

  function handleCreateProject(){}

  return (
    <ProjectsProvider>
      <Container>
        <Title>Projects</Title>
        <TableContainer>
          <ul>
          {/* {projects.map(project => {
            return (
              <li key={project.id}>{project.name}</li>
            )
          })} */}
          </ul>
        </TableContainer>
        <ButtonContainer>
        <Link to="createProject" style={{ textDecoration: 'none' }}>
          <Button onClick={handleCreateProject}>New Project</Button>
        </Link>
        </ButtonContainer>
      </Container>
    </ProjectsProvider>
  )
}
 

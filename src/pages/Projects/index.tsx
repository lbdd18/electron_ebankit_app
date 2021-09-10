import { ProjectsProvider } from '../../hooks/useProjects';

import { HashRouter, Switch, Route } from 'react-router-dom';

import { ListProjects } from './List/index'
import { CreateProject } from './Create/index'

export function Projects() {
  return (
    <ProjectsProvider>
      <HashRouter>
        <Switch>
          <Route path="/">
            <ListProjects />
          </Route>
          <Route path="/createproject">
            <CreateProject />
          </Route>
        </Switch>
      </HashRouter>
    </ProjectsProvider>
  )
}
 

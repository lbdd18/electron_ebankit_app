import { useState } from 'react';
import Modal from 'react-modal'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import { ThemesProvider } from './hooks/useThemes';

import { GlobalStyle } from './styles/global'
import {AppContent, Body, Container, Content } from './styles'

import Header from './components/Header'
import { Navbar } from './components/Navbar'
import { Authentication } from './pages/Authentication'
import { Register } from './pages/Authentication/Register'
import { Menus } from './pages/Menus';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { CreateProject } from './pages/Projects/Create';

Modal.setAppElement('#root')




export function App() {
  const [token, setToken] = useState();

  function unAuthorizedRoutes(){
    return(
      <Container>
        <Content>
          <Authentication setToken={setToken}/>
        </Content>
      </Container>
    )
  }

  function authorizedRoutes(){
    return(
      <Container>
      <Navbar setToken={setToken}/>
      <Content>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/createproject">
            <CreateProject />
          </Route>
          <Route path="/menus">
            <Menus />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Content>
    </Container>
    )
  }

  return (
    <AppContent>
      <HashRouter>
        <ThemesProvider>
          <Body>
            <Header />
            {token ? authorizedRoutes() : unAuthorizedRoutes()}
          </Body>
          <GlobalStyle />
        </ThemesProvider>
      </HashRouter>
    </AppContent>
  )
}
import { useState } from 'react';
import Modal from 'react-modal'
import { SnackbarProvider } from 'notistack';
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
import { Menus } from './pages/Menus';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { CreateProject } from './pages/Projects/Create';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { Toolkit } from './pages/Toolkit';
Modal.setAppElement('#root')

export function App() {
  const [token, setToken] = useState("ola");

  function PrivateRoute ({ children, ...rest }) {
    console.log(children);
    return (
      <Route {...rest}>
        {children}
      </Route>
    )
  }

  function authorizedRoutes(){
    return(
      <Container>
        <Navbar setToken={setToken}/>
        <Content>
          <Switch>
            <Route path="/register">
              <Register setToken={setToken}/>
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/createproject">
              <CreateProject />
            </Route>
            <Route path="/menus">
              <Menus />
            </Route>
            <Route path="/toolkit">
              <Toolkit />
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
      <ThemesProvider>
    <SnackbarProvider maxSnack={3}>
        <HashRouter>
          <Body>
            <Header />
            {authorizedRoutes()}
          </Body>
        </HashRouter>
        </SnackbarProvider>
        <GlobalStyle />
      </ThemesProvider>
    </AppContent>
  )
}
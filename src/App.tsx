import { useState } from 'react';
import Modal from 'react-modal'
import { SnackbarProvider } from 'notistack';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { ThemesProvider } from './hooks/useThemes';

import { GlobalStyle } from './styles/global'
import {AppContent, Body, Container, Content, LeftSection, ContentRoute} from './styles'

import logoImg from './assets/logo_studio.svg'

import Header from './components/Header'
import { Navbar } from './components/Navbar'
import { ListMenus } from './pages/Menus/List';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { CreateProject } from './pages/Projects/Create';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { Toolkit } from './pages/Toolkit';
import { Transactions } from './pages/Transactions';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { AdminPanel } from './pages/AdminPanel';
import { MenusProvider } from './hooks/useMenus';
import { VersionSettingsProvider } from './hooks/useVersionSettings';
import { Grid } from '@material-ui/core';
Modal.setAppElement('#root')

export function App() {
  const [token, setToken] = useState("ola");

  function PrivateRoute ({ children, ...rest }) {
    if(token){
      return (
        <Route {...rest}>
          <Navbar setToken={setToken}/>
          <ContentRoute>
            {children}
          </ContentRoute>
        </Route>
      )
    }

    return (
      <Redirect to='/login' />
    )
    
  }

  function routes(){
    return(
      <Container>
        <Content>
          <Switch>
            <Route path="/register">
              <Grid item xs={6}>
                <LeftSection>
                  <img src={logoImg}/>
                </LeftSection>
              </Grid>
              <Grid item xs={6}>
                <Register setToken={setToken}/>
              </Grid>
            </Route>
            <Route path="/login">
              <Grid item xs={6}>
                <LeftSection>
                  <img src={logoImg}/>
                </LeftSection>
              </Grid>
              <Grid item xs={6}>
                <Login setToken={setToken}/>
              </Grid>
            </Route>
            <PrivateRoute path="/projects">
              <Projects />
            </PrivateRoute>
            <PrivateRoute path="/createproject">
              <CreateProject />
            </PrivateRoute>
            <PrivateRoute path="/menus">
              <MenusProvider>
                <ListMenus />
              </MenusProvider>
            </PrivateRoute>
            <PrivateRoute path="/transactions">
              <Transactions />
            </PrivateRoute>
            <PrivateRoute path="/users">
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <Settings />
            </PrivateRoute>
            <PrivateRoute path="/adminpanel">
              <VersionSettingsProvider>
                <AdminPanel />
              </VersionSettingsProvider>
            </PrivateRoute>
            <PrivateRoute path="/toolkit">
              <Toolkit />
            </PrivateRoute>
            <PrivateRoute path="/">
              <Dashboard />
            </PrivateRoute>
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
            {routes()}
          </Body>
        </HashRouter>
        </SnackbarProvider>
        <GlobalStyle />
      </ThemesProvider>
    </AppContent>
  )
}
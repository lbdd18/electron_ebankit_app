import {ThemeProvider} from 'styled-components'
import Modal from 'react-modal'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import { GlobalStyle } from './styles/global'
import { lightTheme, darkTheme } from './styles/Themes'
import {AppContent, Body, Container, Content } from './styles'

import Header from './components/Header'
import { Navbar } from './components/Navbar'

import { Menus } from './pages/Menus';
import { Projects } from './pages/Projects/List';
import { Dashboard } from './pages/Dashboard';
import { CreateProject } from './pages/Projects/Create';
import { useState } from 'react';

Modal.setAppElement('#root')

export function App() {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <AppContent>

<HashRouter>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Body>
          <Header />
          <Container>
            <Navbar />
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
                  <button onClick={themeToggler}>Switch Theme</button>
                </Route>
              </Switch>
            </Content>
          </Container>
        </Body>
          <GlobalStyle />
      </ThemeProvider>
    </HashRouter>
    </AppContent>
  )
}
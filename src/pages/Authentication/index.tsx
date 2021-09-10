import { Grid } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import { Login } from './Login/index'
import { Register } from './Register/index'

import {Container, LeftSection } from "./styles";

import logoImg from '../../assets/logo_studio.svg'

export function Authentication({setToken}) {
  return (
      <Container>
        <Grid item xs={6}>
          <LeftSection>
            <img src={logoImg}/>
          </LeftSection>
        </Grid>
        <Grid item xs={6}>
          <Switch>
            <Route path="/">
              <Login setToken={setToken}/>
            </Route>
            <Route path="/register">
              <Register setToken={setToken} />
            </Route>
          </Switch>
        </Grid>
      </Container>
  )
}
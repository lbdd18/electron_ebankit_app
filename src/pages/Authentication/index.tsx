import { Grid } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Login } from './Login/index'
import { Register } from './Register/index'

import {Container, LeftSection } from "./styles";

import logoImg from '../../assets/logo_studio.svg'

export function Authentication({setToken}: any) {
  return (
      <Container>
         <Grid item xs={6}>
                <LeftSection>
                  <img src={logoImg}/>
                </LeftSection>
              </Grid>
              <Grid item xs={6}>
                <Switch>
                <Route 
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/login" /> 
                    )
                }}
              />
                  <Route exact path="/register">
                    <Register setToken={setToken} />
                  </Route>
                  <Route exact path="/login">
                    <Login setToken={setToken}/>
                  </Route>
                </Switch>
              </Grid>
      </Container>
  )
}
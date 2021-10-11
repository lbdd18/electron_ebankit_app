

import {FormEvent, useState} from 'react'
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {Box, TextField} from '@material-ui/core'


import { Grid, Title, Container } from "./styles";

import {Button} from "../../../components/Button"

export function Login({setToken}: any) {
  let history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setToken("UserToken");
    history.push("/dashboard")
  }

  return (
    <Container>
      <Grid container spacing={2}>
          <Grid item>
            <Title color="textPrimary"> Login</Title>
          </Grid>
          <Grid item>
            <form onSubmit={handleLogin}>
              <Box paddingBottom={2}>
                <TextField fullWidth variant='outlined' label='email' value={email} onChange={event => setEmail(event.target.value)} />
              </Box>
              <Box paddingBottom={2}>
                <TextField fullWidth variant='outlined' type='password' label='password' value={password} onChange={event => setPassword(event.target.value)} />
              </Box>
              <Button type="submit" variant='contained' color='primary'>Login</Button>
            </form>
          </Grid>
          <Grid item>
            <Link to="/register" style={{ textDecoration: 'none' }} >
              <Button variant="outlined" color="primary">Register</Button>
            </Link>
          </Grid>
      </Grid>
    </Container>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
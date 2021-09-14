
import {Button, Grid} from '@material-ui/core'
import { Link } from 'react-router-dom';

import { Container, Title } from "./styles";

export function Register({setToken}) {

  function handleRegister(){
    setToken("asdasd");
  }

  return (
    <Container>
      <Grid spacing={2}>
        <Grid item>
          <Title>Register</Title>
        </Grid>
        <Link to="/login" style={{ textDecoration: 'none' }} >
          <Button variant="contained" color="primary">Login</Button>
        </Link>
      </Grid>
    </Container>
  )
}
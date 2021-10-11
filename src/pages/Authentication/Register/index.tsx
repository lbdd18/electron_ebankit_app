
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
          <Title color="textPrimary">Register</Title>
        </Grid>
        <Link to="/login" style={{ textDecoration: 'none' }} >
          <Button variant="text" color="primary">Back to Login</Button>
        </Link>
      </Grid>
    </Container>
  )
}
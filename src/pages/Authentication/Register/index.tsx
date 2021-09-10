
import {Button, Grid} from '@material-ui/core'

import { Container, Title } from "./styles";

export function Register({setToken}) {

  function handleRegister(){
    setToken("asdasd");
  }

  return (
    <Container>
      <Grid spacing={2}>
        <Grid item>
          <Title> Register</Title>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleRegister} >Register</Button>
        </Grid>
      </Grid>
    </Container>
  )
}
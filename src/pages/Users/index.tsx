
import {Button, Grid} from '@material-ui/core'

import { Container, Title } from "./styles";

export function Users() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Title>Users</Title>
        </Grid>
      </Grid>
    </Container>
  )
}
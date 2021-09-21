
import {Button, Grid} from '@material-ui/core'

import { Container, Title } from "./styles";

export function AdminPanel() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Title>Admin panel</Title>
        </Grid>
      </Grid>
    </Container>
  )
}
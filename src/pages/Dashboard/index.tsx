
import {Button, Grid} from '@material-ui/core'

import { Container, Title } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Title>Dashboard</Title>
        </Grid>
      </Grid>
    </Container>
  )
}
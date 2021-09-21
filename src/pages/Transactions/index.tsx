
import {Button, Grid} from '@material-ui/core'

import { Container, Title } from "./styles";

export function Transactions() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Title>Transactions</Title>
        </Grid>
      </Grid>
    </Container>
  )
}
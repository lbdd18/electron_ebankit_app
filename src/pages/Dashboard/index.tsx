
import {Button, Grid} from '@material-ui/core'

import { useThemes } from "../../hooks/useThemes";
import { Container, Title } from "./styles";

export function Dashboard() {
  const {changeTheme} = useThemes();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Title> Dashboard</Title>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={changeTheme} >Switch theme</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

import {Button, Grid, Box} from '@material-ui/core'

import { useThemes } from "../../hooks/useThemes";
import { Container, Title } from "./styles";

export function Settings() {
  const {changeTheme} = useThemes();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <Box paddingBottom={2}>
            <Title> Settings</Title>
          </Box>
          <Button variant="contained" color="primary" onClick={changeTheme} >Switch theme</Button>
        </Grid>
      </Grid>
    </Container>
  )
}
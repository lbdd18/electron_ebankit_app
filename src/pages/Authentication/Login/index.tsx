

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Grid, Title } from "./styles";

import {Button} from "../../../components/Button"

export function Login({setToken}: any) {  

  function handleLogin(){
    setToken("asdasd");
  }

  return (
    <Grid container spacing={2}>
        <Grid item>
          <Title> Login</Title>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleLogin} >Login</Button>
        </Grid>
        <Grid item>
          <Link to="register" style={{ textDecoration: 'none' }} >
            <Button variant="contained" color="primary">Register</Button>
          </Link>
        </Grid>
    </Grid>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
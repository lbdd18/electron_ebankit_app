import styled from 'styled-components'
import { Grid } from '@material-ui/core';

export const Container = styled(Grid)`
  display: flex;
  flex:1;
  flex-direction: row;
`;

export const LeftSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.palette.primary.main};
`;
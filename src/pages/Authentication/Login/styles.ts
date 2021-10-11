import styled from 'styled-components'
import {Grid as GridMui, Typography} from '@material-ui/core'

export const Grid = styled(GridMui)`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 4rem;
`;

export const Title = styled(Typography)`
  height: 400;
  font-size: 2rem;
`;
import styled from 'styled-components'
import {Grid as GridMui} from '@material-ui/core'

export const Grid = styled(GridMui)`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.label`
  height: 400;
  font-size: 2rem;
  color: ${props => props.theme.palette.text.primary};
`;

import styled from 'styled-components'
import { Typography } from '@material-ui/core';
import projectImgDark from '../../../assets/STUDIO-projects-bg_dark_3.svg'
import projectImgLight from '../../../assets/STUDIO-projects-bg_light_3.svg'


export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 4rem;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.label`
  color: ${props => props.theme.palette.text.primary};
  height: 400;
  font-size: 2rem;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

interface LogoProps {
  srcDark: string;
  srcLight: string;
}

export const Logo = styled.img.attrs(props => ({
  src: props.theme.palette.type === 'dark' ? projectImgDark : projectImgLight,
}))`
`;


export const MenuItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items:center;
`

export const MenuItemText = styled(Typography)`
margin-left: 8px;
`;
import styled from "styled-components";
import { Typography } from '@material-ui/core';

export const Container = styled.div`
`

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60px;
  align-items: center;
  margin-left: 20px;
`

export const ButtonHeader = styled.button`
  height: 40px;
  width: 40px;
  margin-top: 16px;
  border: 0;
  color: var(--onBackground);
  background-color: var(--background);
`

export const LogoHeader = styled.img`
  height: 70%;
  margin-right: 16px;
  margin-top: 16px;
  background-color: var(--background);
`

export const UserMenuContainer = styled.div`
`

export const UserDetails = styled.div`
  display: flex;
  margin-left: 16px;
  margin-bottom: 8px;
`
export const UserLogo = styled.div`
  margin-right: 16px;
`

export const UserData = styled.div`
  margin-right: 16px;
`


export const MenuOptions = styled.div`
`

export const MenuItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items:center;
`

export const MenuItemText = styled(Typography)`
margin-left: 8px;
`;
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem } from 'react-pro-sidebar';
import { FiMenu, FiUser, FiTool, FiLogOut} from "react-icons/fi";
import {Avatar, Typography, Grid, Box} from "@material-ui/core";
import {Menu as UserMenu, MenuItem as UserMenuItem, Divider, Stack} from '@mui/material';


import logoImg from '../../assets/sidebar_logo2.svg'

import { Container, HeaderContainer, ButtonHeader, LogoHeader, UserMenuContainer, UserDetails, UserLogo, UserData, MenuOptions, MenuItemContainer, MenuItemText} from "./styles";
import './variables.scss'

import { SidebarData } from "./SidebarData";

export function Navbar({ setToken }: any){
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const urlImage = 'https://avatars.githubusercontent.com/u/21287258?v=4'

  return (
    <Container>
      <ProSidebar collapsed={sidebar} toggled={true}>
        <SidebarHeader>
          <HeaderContainer>
            {sidebar ? (
                <ButtonHeader onClick={showSidebar}>{<FiMenu />}</ButtonHeader>
              ) : (
                <>
                <LogoHeader src={logoImg}/>
                <ButtonHeader onClick={showSidebar}>{<FiMenu />}</ButtonHeader>
                </>
              )}
          </HeaderContainer>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            {SidebarData.map(menu=>{
              return(
                <MenuItem key={menu.title} icon={menu.icon}>
                  {menu.title}
                  <Link to={menu.path} />
                </MenuItem>
              )
            })}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <MenuItem  aria-haspopup="true" aria-expanded={open ? 'true' : undefined} disableElevation icon={urlImage ? (<Avatar alt="Luciano Dias" src={urlImage} />) : (<Avatar {...stringAvatar('Luciano Dias')} />)} onClick={handleClick}>Luciano Dias</MenuItem>
            <UserMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <UserMenuContainer>
                <UserDetails>
                  <UserLogo>
                      {urlImage ? (<Avatar alt="Luciano Dias" src={urlImage} />) : (<Avatar {...stringAvatar('Luciano Dias')} />)}
                  </UserLogo>
                  <UserData>
                    <Stack>
                      <Typography variant="h6">Luciano Dias</Typography>
                      <Typography variant="caption">Developer</Typography>
                    </Stack>
                  </UserData>
                </UserDetails>
                <MenuOptions>
                    <UserMenuItem onClick={handleClose} disableRipple>
                      <MenuItemContainer>
                        <FiUser />
                        <MenuItemText>Show Profile</MenuItemText>
                      </MenuItemContainer>
                    </UserMenuItem>
                    <UserMenuItem onClick={handleClose} disableRipple>
                      <MenuItemContainer>
                        <FiTool />
                        <MenuItemText>Account Settings</MenuItemText>
                      </MenuItemContainer>
                    </UserMenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <UserMenuItem onClick={()=> setToken('')} disableRipple>
                      <MenuItemContainer>
                      <FiLogOut />
                        <MenuItemText>Sign Out</MenuItemText>
                      </MenuItemContainer>
                    </UserMenuItem>
                </MenuOptions>
              </UserMenuContainer>
            </UserMenu>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Container>
  );
};
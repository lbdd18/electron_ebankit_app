import { Link } from "react-router-dom";
import { useState } from "react";
import './variables.scss'

import logoImg from '../../assets/sidebar_logo.svg'

import { FiHome, FiMenu, FiLogOut, FiFolder, FiLayers} from "react-icons/fi";

import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem } from 'react-pro-sidebar';

import { Container, HeaderContainer, ButtonHeader, LogoHeader } from "./styles";
import { SidebarData } from "./SidebarData";

export function Navbar(){
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
                <MenuItem icon={menu.icon}>
                  {menu.title}
                  <Link to={menu.path} />
                </MenuItem>
              )
            })}
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Container>
  );
};
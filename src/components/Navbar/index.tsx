import { useState } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem } from 'react-pro-sidebar';
import { FiMenu, FiLogOut} from "react-icons/fi";

import logoImg from '../../assets/sidebar_logo.svg'

import { Container, HeaderContainer, ButtonHeader, LogoHeader } from "./styles";
import './variables.scss'

import { SidebarData } from "./SidebarData";

export function Navbar({ setToken }: any){
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
            <MenuItem icon={<FiLogOut />} onClick={()=>{setToken('')}}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Container>
  );
};
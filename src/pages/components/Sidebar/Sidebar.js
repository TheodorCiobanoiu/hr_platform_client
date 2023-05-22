import React, {useState} from 'react'
import styled from "styled-components";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {Link} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import {SubMenu} from "./SubMenu";
import AuthService from "../../../services/auth.service";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
export const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);
    const user = AuthService.getCurrentUser();

    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSidebar}/>
                    </NavIcon>
                </SidebarWrap>
                {SidebarData.map((item, index) => {
                    return (
                        (item.alwaysVisible || (item.visibility === user.roles[0])) &&
                        <SubMenu item={item} key={index}/>
                    );
                })}
            </SidebarNav>
        </>
    )
}

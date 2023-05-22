import React, {useState} from 'react'
import styled from "styled-components";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {Link, useNavigate} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import {SubMenu} from "./SubMenu";
import AuthService from "../../../services/auth.service";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
  color: #e1e9fc;
`;
const ProfileIcon = styled(Link)`
  margin-left: auto;
  margin-right: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: #e1e9fc;
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
export const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();
    React.useEffect(() => {
        const noUserPresent = AuthService.checkForUser();
        if (noUserPresent) {
            console.log("No user found inside local storage, navigating to /login");
            navigate('/login');
        }
    }, []);
    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </NavIcon>
                <ProfileIcon to="#">
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem>
                                <Link to={"/login"} style={{textDecoration: "none", color: "inherit"}}>
                                    Logout
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                </ProfileIcon>
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

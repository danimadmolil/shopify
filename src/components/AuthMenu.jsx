import React, { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { PersonSharp } from "@mui/icons-material";
import useUser from "../hooks/useUser";

export default function AuthMenu() {
  const navigate = useNavigate();
  const { user: user2, isAuthenticated, logout } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderUnAuthenticatedMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/signin">SignIn</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link style={{}} to={"/signup"}>
          Signup
        </Link>
      </MenuItem>
    </Menu>
  );
  const renderAuthenticatedMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link style={{}} to={"/profile"}>
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link style={{}} to={"/setting"}>
          Setting
        </Link>
      </MenuItem>
      <MenuItem
        onClick={(event) => {
          handleMenuClose(event);
          window.localStorage.setItem("isAuthenticated", false);
          logout();
          navigate({ pathname: "/" });
          /*todo place logic for logout then redirect to home page*/
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
          {isAuthenticated ? (
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          ) : (
            <PersonSharp style={{ color: "white", fontSize: 35 }} />
          )}
        </IconButton>
      </Tooltip>

      {isAuthenticated ? renderAuthenticatedMenu : renderUnAuthenticatedMenu}
    </>
  );
}

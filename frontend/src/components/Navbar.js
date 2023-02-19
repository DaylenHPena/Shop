import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUsername } from "../features/user/userSlice";
import CartButton from "./CartButton";
import Search from "./Search";

export default function Navbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          edge="end"
          aria-label="cart"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => {
            navigate("/cart/");
          }}
          color="inherit"
        >
          <CartButton />
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          edge="end"
          aria-label="wishlist"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => {
            navigate("/wishlist/");
          }}
          color="inherit"
        >
          <LoyaltyOutlinedIcon />
        </IconButton>
      </MenuItem>

      {username ? (
        <MenuItem>
          <IconButton
            size="large"
            edge="end"
            aria-label="profile"
            onClick={() => {
              navigate("/profile/");
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </MenuItem>
      ) : (
        <MenuItem>
          <IconButton
            size="large"
            edge="end"
            aria-label="profile"
            onClick={() => {
              navigate("/login/");
            }}
            color="inherit"
          >
            <LoginIcon />
          </IconButton>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "#573e83",
          boxShadow: 0,
          borderBottom: "1px solid #ded2f2",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" }, marginRight: "1rem" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Typography>

          <Search />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="cart"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {
                navigate("/cart/");
              }}
              color="inherit"
            >
              <Typography>Cart</Typography>
              <CartButton />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="wishlist"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {
                navigate("/wishlist/");
              }}
              color="inherit"
            >
              <Typography>Wishlist</Typography>
              <LoyaltyOutlinedIcon />
            </IconButton>
            {username ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="profile"
                onClick={() => {
                  navigate("/profile/");
                }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="profile"
                onClick={() => {
                  navigate("/login/");
                }}
                color="inherit"
              >
                <Typography>Login</Typography><LoginIcon />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

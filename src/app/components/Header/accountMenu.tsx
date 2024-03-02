import * as React from "react";
import useProfile from "@/lib/useProfile";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CreateIcon from "@mui/icons-material/Create";
import User from "./User";
import LoginBtn from "./loginBtn";

const AccountMenu = () => {
  const profileData = useProfile();
  const profile = profileData.profile;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <StyledAvatar src={profile ? profile.image : ""} alt="アイコン" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 50,
              height: 50,
              ml: 1,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profile ? <User /> : <LoginBtn />}
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <StyledLink href={"/auth/profile"}>プロフィール設定</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <StyledLink href={"/post/create"}>投稿</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <StyledLink href={"/auth/logout"}>ログアウト</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <StyledLink href={"/contact"}>お問い合わせ</StyledLink>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 55,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: 500,
  letterSpacing: 1,
}));

export default AccountMenu;

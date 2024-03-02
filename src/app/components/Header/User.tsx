import * as React from "react";
import useProfile from "@/lib/useProfile";
import useUser from "@/lib/useUser";
import { Avatar, MenuItem, Typography } from "@mui/material";

const User = () => {
  const profileData = useProfile();
  const profile = profileData.profile;
  const { user } = useUser();
  
  return (
    <MenuItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 1.5,
      }}
    >
      <Avatar src={profile ? profile.image : ""} alt="アイコン" />
      <Typography
        fontFamily="游ゴシック"
        fontWeight="bold"
        letterSpacing={1}
        mt={1.5}
      >
        {profile ? profile.name : ""}さん
      </Typography>
      <Typography fontFamily="游ゴシック" letterSpacing={1} mt={1.5} px={2.5}>
        {user ? user.email : ""}
      </Typography>
    </MenuItem>
  );
};

export default User;

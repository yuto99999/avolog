"use client";
import * as React from "react";
import { Box, Typography, Tab, Tabs, Avatar, styled } from "@mui/material";
import Post from "./Post/post";
import MyRecipe from "./Recipe/myRecipe";
import useProfile from "@/lib/useProfile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

const Mypage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const profileData = useProfile();
  const profile = profileData.profile;

  return (
    <Box width="100%" mt="12vh" pt="1rem">
      <Box px={10} py={5} display="flex" alignItems="center">
        <StyledAvatar src={profile ? profile.image : ""} alt="アイコン" />
        <Typography
          fontFamily="游ゴシック"
          fontWeight="bold"
          fontSize="4.5rem"
          letterSpacing={1}
          ml={5}
        >
          {profile ? profile.name : ""}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="お店の投稿" />
          <Tab label="レシピの投稿" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Post />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyRecipe />
      </CustomTabPanel>
    </Box>
  );
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
}));

export default Mypage;

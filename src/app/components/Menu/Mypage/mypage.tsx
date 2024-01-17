"use client";
import * as React from "react";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import Save from "./Save/save";
import Post from "./Post/post";
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


export default function Mypage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" mt="12vh" pt="1rem">
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
          <Tab label="保存" />
          <Tab label="投稿" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Save />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Post />
      </CustomTabPanel>
    </Box>
  );
}

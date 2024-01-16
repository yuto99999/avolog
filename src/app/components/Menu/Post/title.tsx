"use client"
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Typography, styled } from "@mui/material";

const style = {
  p: 0,
  width: "100%",
  maxWidth: 300,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const Title = () => {
  return (
    <List sx={style} aria-label="mailbox folders">
      <StyledList>
        <StyledTitle>店名</StyledTitle>
      </StyledList>
      <Divider component="li" light />
      <StyledList>
        <StyledTitle>都道府県</StyledTitle>
      </StyledList>
      <Divider component="li" light />
      <StyledList>
        <StyledTitle>住所</StyledTitle>
      </StyledList>
      <Divider component="li" light />
      <StyledList>
        <StyledTitle>ジャンル</StyledTitle>
      </StyledList>
      <Divider component="li" light />
      <StyledList>
        <StyledTitle>予算</StyledTitle>
      </StyledList>
      <Divider component="li" light />
      <StyledList>
        <StyledTitle>評価</StyledTitle>
      </StyledList>
      <Divider component="li" light />
    </List>
  );
};

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "游ゴシック",
  fontWeight: 600,
  fontSize: "1.7rem",
  color: "GrayText",
}));

const StyledList = styled(ListItem)(({ theme }) => ({
  height: 80,
}));

export default Title;

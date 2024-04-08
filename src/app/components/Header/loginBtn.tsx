import React from "react";
import { Box, Button, styled, Link, Typography } from "@mui/material";

const LoginBtn = () => {
  return (
    <Container>
      <Message>ログインは</Message>
      <StyledLink href={"/auth/login"}>こちらから</StyledLink>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 25,
  paddingBottom: 25,
}));

const Message = styled(Typography)(({ theme }) => ({
  fontFamily: "游ゴシック",
  fontWeight: 500,
  letterSpacing: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: "游ゴシック",
  fontWeight: 500,
  letterSpacing: 1,
}));

export default LoginBtn;

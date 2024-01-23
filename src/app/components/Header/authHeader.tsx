"use client";
import { Avatar, Box, Link, Typography, styled } from "@mui/material";

const AuthHeader = () => {
  return (
    <StyledHeader>
      <Box display="flex" alignItems="center" mt={4} ml={8}>
        <StyledLink href={"/"} display="flex" alignItems="center">
          <StyledAvater alt="AvoLogロゴ" src="../img/AvoLogo.png" />
          <StyledTitle>AvoLog</StyledTitle>
        </StyledLink>
      </Box>
    </StyledHeader>
  );
};

const StyledHeader = styled(Box)(({ theme }) => ({
  height: "13vh",
  backgroundColor: "transparent",
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
}));

const StyledAvater = styled(Avatar)(({ theme }) => ({
  width: 65,
  height: 65,
  marginRight: 10,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1.7rem",
  letterSpacing: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

export default AuthHeader;

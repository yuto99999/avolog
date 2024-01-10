"use client";
import { Avatar, Box, Link, Typography, styled } from "@mui/material";
import AccountMenu from "./accountMenu";

const Header = () => {
  return (
    <StyledHeader>
      <Box display="flex" alignItems="center" gap={10} ml={12}>
        <StyledLink href={"/"} display="flex" alignItems="center">
          <StyledAvatar alt="AvoLogロゴ" src="../img/AvoLogo.png" />
          <StyledTitle>AvoLog</StyledTitle>
        </StyledLink>
        <StyledLink href={"/menu/shop"}>お店</StyledLink>
        <StyledLink href={"/menu/recipe"}>レシピ</StyledLink>
        <StyledLink href={"/menu/mypage"}>マイページ</StyledLink>
      </Box>
      <Box display="flex" alignItems="center" gap={3} mr={10}>
        <StyledLink href={"/auth/register"}>会員登録</StyledLink>
        <StyledLink href={"/auth/login"}>ログイン</StyledLink>
        <AccountMenu />
      </Box>
    </StyledHeader>
  );
};

const StyledHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "13vh",
  backgroundColor: "#F1F4E1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 999,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 65,
  height: 65,
  marginRight: 10,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1.5rem",
  letterSpacing: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1.3rem",
  letterSpacing: 1,
}));

export default Header;

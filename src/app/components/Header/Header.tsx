"use client";
import { Avatar, Box, Link, Typography, styled } from "@mui/material";
import AccountMenu from "./accountMenu";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContents>
        <Box display="flex" alignItems="center" gap={5} ml={7}>
          <StyledLink href={"/"}>
            <Title>AvoLog</Title>
          </StyledLink>
          <StyledLink href={"/menu/shop"}>shop</StyledLink>
          <StyledLink href={"/menu/recipe"}>レシピ</StyledLink>
          <StyledLink href={"/menu/mypage"}>マイページ</StyledLink>
        </Box>
        <Box display="flex" alignItems="center" gap={3} mr={5}>
          <StyledLink href={"/about"}>サイトについて</StyledLink>
          <StyledLink href={"/auth/register"}>会員登録</StyledLink>
          <StyledLink href={"/auth/login"}>ログイン</StyledLink>
          <AccountMenu />
        </Box>
      </HeaderContents>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "15vh",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 999,
}));

const HeaderContents = styled(Box)(({ theme }) => ({
  width: "95%",
  height: "10vh",
  backgroundColor: "#F1F4E1",
  marginTop: "1.5vh",
  marginBottom: "1.5vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "5rem",
}));

const Title = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1.3rem",
  letterSpacing: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontSize: "1rem",
  letterSpacing: 1,
}));

export default Header;

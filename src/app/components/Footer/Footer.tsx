"use client";
import { Box, Typography, styled, Avatar, Link } from "@mui/material";

const Footer = () => {
  return (
    <StyledFooter>
      <Box display="flex" flexDirection="column" alignItems="center">
        <StyledAvater alt="AvoLogロゴ" src="../img/AvoLogo.png" />
        <StyledTitle>AvoLog</StyledTitle>
      </Box>
      <StyledLink href={"/contact"}>お問い合わせはこちらから</StyledLink>
      <Typography fontFamily="游ゴシック" fontWeight={400}>
        © {new Date().getFullYear()} AvoLog
      </Typography>
    </StyledFooter>
  );
};

const StyledFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "25vh",
  backgroundColor: "#F1F4E1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledAvater = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 55,
  marginRight: 10,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "#000000",
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1.4rem",
  letterSpacing: 1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#505050",
  fontFamily: "游ゴシック",
  fontWeight: "600",
  fontSize: "1.1rem",
  letterSpacing: 1,
  marginBottom: 5,
  "&:hover": { color: "#000000" },
}));

export default Footer;

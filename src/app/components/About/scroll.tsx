import { Box, Typography, styled } from "@mui/material";
import React from "react";

const Scroll = () => {
  return (
    <>
      <style>{globalStyles}</style>
      <Box width="100%" pt="3.5rem">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography
            fontFamily="游ゴシック"
            fontSize="3.3rem"
            fontWeight="bold"
            letterSpacing={1}
          >
            充実した「アボライフ」をあなたに。
          </Typography>
        </Box>
        <ScrollAnimation>
          <span>Scroll</span>
        </ScrollAnimation>
      </Box>
    </>
  );
};

const ScrollAnimation = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: "30px",
  height: "50px",
  transform: "translateX(-50%)",
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    width: "1.5px",
    height: "80px",
    background: "#000",
    animation: "pathmove 1.5s ease-in-out infinite",
  },
  "& span": {
    position: "absolute",
    left: "-30px",
    top: "-30px",
    color: "#000",
    fontSize: "1.4rem",
    fontFamily: "游ゴシック",
    letterSpacing: "0.05em",
  },
}));

const globalStyles = `
  @keyframes pathmove {
    0% {
      height: 0;
      top: 0;
      opacity: 0.5; 
    }
    30% {
      height: 40px;
      opacity: 1; 
    }
    100% {
      height: 0;
      top: 80px;
      opacity: 0.5; 
    }
  }
`;

export default Scroll;

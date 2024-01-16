"use client";
import { Box, Typography } from "@mui/material";
import Post from "./Post/post";
import DisplayShop from "./displayShop";

const Shop = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      pt="6.5rem"
      sx={{ backgroundColor: "#F8F9F9" }}
    >
      {/* <Post /> */}
      <DisplayShop />
    </Box>
  );
};

export default Shop;

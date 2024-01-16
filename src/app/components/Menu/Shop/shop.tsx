"use client";
import { Box } from "@mui/material";
import DisplayShop from "./displayShop";
import SerchBox from "./serchBox";

const Shop = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      pt="6.5rem"
      sx={{ backgroundColor: "#F8F9F9" }}
    >
      <SerchBox />
      <DisplayShop />
    </Box>
  );
};

export default Shop;

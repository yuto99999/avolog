"use client";
import { Box } from "@mui/material";
import DisplayShop from "./Display/displayShop";
import SerchBox from "./serchBox";

const Shop = () => {
  return (
    <Box width="100%" minHeight="100vh" pt="8rem">
      <SerchBox />
      <DisplayShop />
    </Box>
  );
};

export default Shop;

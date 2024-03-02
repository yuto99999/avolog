"use client";
import DisplayShop from "@/app/components/Menu/Shop/Display/displayShop";
import SerchBox from "@/app/components/Menu/Shop/Display/serchBox";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box width="100%" minHeight="100vh" pt="8rem">
      <SerchBox />
      <DisplayShop />
    </Box>
  );
}

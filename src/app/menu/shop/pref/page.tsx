"use client"
import DisplayBudget from "@/app/components/Menu/Shop/Display/displayBudget";
import SerchBox from "@/app/components/Menu/Shop/serchBox";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box width="100%" minHeight="100vh" pt="8rem">
      <SerchBox />
      <DisplayBudget />
    </Box>
  );
}
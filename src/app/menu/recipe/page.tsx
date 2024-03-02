"use client";
import CreateBtn from "@/app/components/Menu/Recipe/createBtn";
import Recipe from "@/app/components/Menu/Recipe/recipe";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box width="100%" minHeight="100vh" pt="8rem">
      <CreateBtn />
      <Recipe />
    </Box>
  );
}

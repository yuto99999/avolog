import { Box, Typography } from "@mui/material";
import Slider from "./slider";
import ShopRank from "./shopRank";
import RecipeRank from "./recipeRank";

const Top = () => {
  return (
    <Box width="100%">
      <Slider />
      <ShopRank />
      <RecipeRank />
    </Box>
  );
};

export default Top;

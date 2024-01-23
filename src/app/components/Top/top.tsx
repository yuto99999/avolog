import { Box } from "@mui/material";
import Slider from "./slider";
import ShopRank from "./shopRank";
import RecipeRank from "./recipeRank";

const Top = () => {
  return (
    <Box width="100%" mt="7.5rem">
      <Slider />
      <ShopRank />
      <RecipeRank />
    </Box>
  );
};

export default Top;

"use client";
import { Box, Typography, Fab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Shop = () => {
  return (
    <Box width="100%" height="100vh" pt="7rem">
      <Typography>Shop</Typography>
      <StyledBtnBox>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </StyledBtnBox>
    </Box>
  );
};

const StyledBtnBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "5%",
  right: "5%",
}));

export default Shop;

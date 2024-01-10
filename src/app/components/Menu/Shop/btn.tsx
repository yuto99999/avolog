import { Box, Fab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Btn = () => {
  return (
    <StyledBtnBox>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </StyledBtnBox>
  );
};

const StyledBtnBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "5%",
  right: "5%",
}));

export default Btn;

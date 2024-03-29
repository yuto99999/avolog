"use client";
import { useRouter } from "next/navigation";
import { Box, Button, Card, styled } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import BudgetBtn from "../ConditionBtn/bugetBtn";
import RateBtn from "../ConditionBtn/rateBtn";
import GenreBtn from "../ConditionBtn/genreBtn";
import PrefBtn from "../ConditionBtn/prefBtn";

const SerchBox = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/post/create");
  };

  return (
    <Box pl={12} pr={12} mb={3}>
      <Card
        sx={{
          width: "100%",
          height: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <RateBtn />
        <BudgetBtn />
        <PrefBtn />
        <GenreBtn />
        <StyledBtn onClick={onClick} variant="contained">
          <CreateIcon />
          投稿する
        </StyledBtn>
      </Card>
    </Box>
  );
};

const StyledBtn = styled(Button)(({ theme }) => ({
  fontFamily: "游ゴシック",
  fontWeight: "bold",
  fontSize: "1rem",
}));

export default SerchBox;

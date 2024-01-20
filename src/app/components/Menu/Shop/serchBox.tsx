"use client";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Chip, Typography, styled } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const SerchBox = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/post/shop");
  };

  const handleClick = () => {
    router.push("/");
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
        <Chip label="高い順" variant="outlined" onClick={handleClick} />
        <Chip label="低い順" variant="outlined" onClick={handleClick} />
        <Chip label="評価順" variant="outlined" onClick={handleClick} />
        <Chip label="東京都" variant="outlined" onClick={handleClick} />
        <Chip label="長崎県" variant="outlined" onClick={handleClick} />
        <Chip label="大阪府" variant="outlined" onClick={handleClick} />
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

import { Box, Button, Link } from "@mui/material";

const BackButton = () => {
  return (
    <Link href={"/menu/shop"}>
      <Button
        variant="text"
        sx={{
          fontFamily: "游ゴシック",
          fontSize: "1rem",
          color: "#000000",
          p: 1,
        }}
      >
        一覧へ戻る
      </Button>
    </Link>
  );
};
export default BackButton;

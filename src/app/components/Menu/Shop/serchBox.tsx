"use client"
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

const SerchBox = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/post/shop");
  };

  return (
    <Box
      width="100%"
      height="5rem"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Typography>ジャンル</Typography>
      <Button onClick={onClick}>投稿</Button>
    </Box>
  );
};

export default SerchBox;

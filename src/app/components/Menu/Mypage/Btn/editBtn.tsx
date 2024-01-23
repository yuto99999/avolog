import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";

const EditBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/post/shop");
  };

  return (
    <Box>
      <Button onClick={handleClick} sx={{ color: "#000000" }}>
        編集
      </Button>
    </Box>
  );
};
export default EditBtn;

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const EditBtn = ({ docId }: { docId: string }) => {
  const router = useRouter();

  return (
    <Box>
      <Link href={`/post/${docId}`}>
        <Button sx={{ color: "#000000" }}>編集</Button>
      </Link>
    </Box>
  );
};
export default EditBtn;

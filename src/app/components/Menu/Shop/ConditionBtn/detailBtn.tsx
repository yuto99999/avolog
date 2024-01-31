import { Box, Button } from "@mui/material";
import Link from "next/link";

const DetailBtn = ({ docId }: { docId: string }) => {
  return (
    <Box>
      <Link href={`/menu/shop/${docId}`}>
        <Button
          variant="text"
          sx={{ color: "#000000", marginRight: 2, fontSize: "0.9rem" }}
        >
          詳しく
        </Button>
      </Link>
    </Box>
  );
};
export default DetailBtn;

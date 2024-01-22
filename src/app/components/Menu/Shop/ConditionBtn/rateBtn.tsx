import { useRouter } from "next/navigation";
import { Box, Chip } from "@mui/material";

const RateBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu/shop/rate");
  };
  return (
    <Box>
      <Chip label="評価順" variant="outlined" onClick={handleClick} />
    </Box>
  );
};

export default RateBtn;

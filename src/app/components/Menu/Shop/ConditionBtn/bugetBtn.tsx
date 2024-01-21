import { useRouter } from "next/navigation";
import { Box, Chip } from "@mui/material";

const BudgetBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu/shop/budget");
  };
  return (
    <Box display="flex" gap={1}>
      <Chip label="高い順" variant="outlined" onClick={handleClick} />
      <Chip label="低い順" variant="outlined" onClick={handleClick} />
    </Box>
  );
};

export default BudgetBtn;

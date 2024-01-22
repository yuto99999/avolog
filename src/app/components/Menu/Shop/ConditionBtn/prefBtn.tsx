import { useRouter } from "next/navigation";
import { Box, Chip } from "@mui/material";

const PrefBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu/shop/pref");
  };
  return (
    <Box display="flex" gap={1}>
      <Chip label="東京都" variant="outlined" onClick={handleClick} />
      <Chip label="長崎県" variant="outlined" onClick={handleClick} />
      <Chip label="大阪府" variant="outlined" onClick={handleClick} />
    </Box>
  );
};

export default PrefBtn;

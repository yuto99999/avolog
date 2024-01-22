import { useRouter } from "next/navigation";
import { Box, Chip } from "@mui/material";

const GenreBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu/shop/genre");
  };
  return (
    <Box display="flex" gap={1}>
      <Chip label="和食" variant="outlined" onClick={handleClick} />
      <Chip label="洋食" variant="outlined" onClick={handleClick} />
      <Chip label="メキシカン" variant="outlined" onClick={handleClick} />
      <Chip label="中華" variant="outlined" onClick={handleClick} />
      <Chip
        label="アジア・エスニック"
        variant="outlined"
        onClick={handleClick}
      />
      <Chip label="その他" variant="outlined" onClick={handleClick} />
    </Box>
  );
};

export default GenreBtn;

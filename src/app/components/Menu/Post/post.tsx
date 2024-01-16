import { Box } from "@mui/material";
import Title from "./title";
import Field from "./field";

const Post = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" pt="6.5rem">
      <Title />
      <Field />
    </Box>
  );
};

export default Post;

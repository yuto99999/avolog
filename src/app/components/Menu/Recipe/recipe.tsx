import { Timestamp } from "firebase/firestore";
import useFirebase from "@/lib/useFirebase";
import DetailBtn from "./detailBtn";
import {
  Box,
  Typography,
  Avatar,
  styled,
  Grid,
  Card,
  Checkbox,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlaceIcon from "@mui/icons-material/Place";

interface Recipe {
  id: string;
  image: string;
  name: string;
  intro: string;
  genre: string;
  item: string;
  make: string;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Recipe = () => {
  const { documents: recipes } = useFirebase("Recipe", "createdAt", "desc");

  return (
    <Box p={3} pl={12} pr={12} display="flex">
      <Grid container spacing={5}>
        {recipes.map((recipe: Recipe) => (
          <Grid
            item
            xs={12}
            md={4}
            key={recipe.id}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                width: "100%",
                mb: 5,
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <Box display="flex" alignItems="center" p={1}>
                <Avatar
                  src={recipe.user.image ? recipe.user.image : ""}
                  alt=""
                />
                <Typography
                  pl={1.5}
                  fontFamily="游ゴシック"
                  fontWeight="bold"
                  fontSize="1rem"
                >
                  {recipe.user.name}
                </Typography>
              </Box>
              <StyledImage src={recipe.image} />
              <Typography
                pt={1.5}
                pl={1.8}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="1.2rem"
              >
                {recipe.name}
              </Typography>
              <Box display="flex" alignItems="center" pt={1} pl={1.6}>
                <PlaceIcon fontSize="small" />
                <Typography
                  pl={0.5}
                  fontFamily="游ゴシック"
                  fontWeight="bold"
                  fontSize="0.9rem"
                >
                  {recipe.genre}
                </Typography>
              </Box>
              <Box
                pb={1.2}
                pl={0.8}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                  <Checkbox
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  />
                </Box>
                <DetailBtn docId={recipe.id} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const StyledImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "13rem",
  objectFit: "cover",
}));

export default Recipe;

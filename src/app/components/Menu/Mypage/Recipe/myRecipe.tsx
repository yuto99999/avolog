"use client";
import useMypost from "@/lib/useMypost";
import { Timestamp } from "firebase/firestore";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import DeleteBtn from "../Btn/delateBtn";
import EditBtn from "../Btn/editBtn";

interface Mypost {
  id: string;
  image: string;
  genre: string;
  name: string;
  item: string;
  make: string;
  intro: string;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
}

const MyRecipe = () => {
  const { documents: myRecipe } = useMypost("Recipe");

  return (
    <Box p={3} pl={12} pr={12} display="flex">
      <Grid container spacing={5}>
        {myRecipe.map((myPost: Mypost) => (
          <Grid
            item
            xs={12}
            md={4}
            key={myPost.id}
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" p={1}>
                  <Avatar
                    src={myPost.user.image ? myPost.user.image : ""}
                    alt=""
                  />
                  <Typography
                    pl={1.5}
                    fontFamily="游ゴシック"
                    fontWeight="bold"
                    fontSize="1rem"
                  >
                    {myPost.user.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mr={1}>
                  <EditBtn docId={myPost.id} />
                  <DeleteBtn docId={myPost.id} />
                </Box>
              </Box>
              <StyledImage src={myPost.image} />
              <Typography
                pt={1.5}
                pl={1.8}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="1.2rem"
              >
                {myPost.name}
              </Typography>
              <Typography
                pt={1}
                pl={1.8}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="0.9rem"
              >
                {myPost.genre}
              </Typography>
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

export default MyRecipe;

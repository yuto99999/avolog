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
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import DeleteBtn from "../delateBtn";
import EditBtn from "../editBtn";

interface Mypost {
  id: any;
  address: string;
  image: string;
  budgetL: string;
  budgetD: string;
  genre: string;
  name: string;
  prefecture: string;
  rate: number;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
}

const MyPost = () => {
  const { documents: myPosts } = useMypost("Shop");

  return (
    <Box p={3} pl={12} pr={12} display="flex">
      <Grid container spacing={5}>
        {myPosts.map((myPost: Mypost) => (
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
                <Box display="flex" alignItems="center" pr={1}>
                  <EditBtn />
                  <DeleteBtn id={myPost.id} />
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
                {myPost.address}
              </Typography>
              <Box display="flex" pl={1} pt={0.3}>
                <Box p={0.7} display="flex" alignItems="center">
                  <LightModeIcon fontSize="small" />
                  <Typography
                    pl={0.5}
                    fontFamily="游ゴシック"
                    fontWeight="bold"
                    fontSize="0.9rem"
                  >
                    {myPost.budgetL}
                  </Typography>
                </Box>
                <Box p={0.7} display="flex" alignItems="center">
                  <BedtimeIcon fontSize="small" />
                  <Typography
                    pl={0.5}
                    fontFamily="游ゴシック"
                    fontWeight="bold"
                    fontSize="0.9rem"
                  >
                    {myPost.budgetD}
                  </Typography>
                </Box>
              </Box>
              <Box pb={1.2} pl={1.5} display="flex" alignItems="center">
                <Rating
                  name="half-rating-read"
                  defaultValue={myPost.rate}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  pl={1}
                  fontFamily="游ゴシック"
                  fontWeight="bold"
                  fontSize="0.9rem"
                >
                  {myPost.rate}
                </Typography>
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

export default MyPost;

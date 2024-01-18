import { Timestamp } from "firebase/firestore";
import useFirebase from "@/lib/useFirebase";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  styled,
  Grid,
  Card,
} from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";

interface Shop {
  id: string;
  address: string;
  budget: string;
  category: string;
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

const DisplayShop = () => {
  const { documents: shops } = useFirebase("Shop");

  return (
    <Box p={3} pl={12} pr={12} display="flex">
      <Grid container spacing={5}>
        {shops.map((shop: Shop) => (
          <Grid
            item
            xs={12}
            md={4}
            key={shop.id}
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
                <Avatar src={shop.user.image ? shop.user.image : ""} alt="" />
                <Typography
                  pl={1.5}
                  fontFamily="游ゴシック"
                  fontWeight="bold"
                  fontSize="1rem"
                >
                  {shop.user.name}
                </Typography>
              </Box>
              <StyledImage src={"../img/top/top2.png"} />
              <Typography
                pt={1.5}
                pl={1.8}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="1.2rem"
              >
                {shop.name}
              </Typography>
              <Typography
                pt={1}
                pl={1.8}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="0.9rem"
              >
                {shop.address}
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
                    {shop.budget}
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
                    {shop.budget}
                  </Typography>
                </Box>
              </Box>
              <Box pb={1.2} pl={1.5} display="flex" alignItems="center">
                <Rating
                  name="half-rating-read"
                  defaultValue={shop.rate}
                  precision={0.1}
                  readOnly
                />
                <Typography
                  pl={1}
                  fontFamily="游ゴシック"
                  fontWeight="bold"
                  fontSize="0.9rem"
                >
                  {shop.rate}
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

export default DisplayShop;

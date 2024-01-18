import { Timestamp } from "firebase/firestore";
import useFirebase from "@/lib/useFirebase";
import { Box, Typography, Avatar, Rating, styled, Grid } from "@mui/material";
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
    <Box p={3} pl={5} display="flex">
      <Grid container spacing={2}>
        {shops.map((shop: Shop) => (
          <Grid
            item
            xs={12}
            md={4}
            key={shop.id}
            display="flex"
            justifyContent="center"
          >
            <Box
              width="90%"
              mb={5}
              sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
            >
              <Box display="flex" alignItems="center" p={1}>
                <Avatar src={shop.user.image ? shop.user.image : ""} alt="" />
                <Typography pl={1.5}>{shop.user.name}</Typography>
              </Box>
              <StyledImage src={"../img/top/top2.png"} />
              <Typography p={0.7}>{shop.name}</Typography>
              <Typography p={0.7}>{shop.address}</Typography>
              <Box display="flex">
                <Box p={0.7} display="flex" alignItems="center">
                  <LightModeIcon fontSize="small" />
                  <Typography pl={0.5}>{shop.budget}</Typography>
                </Box>
                <Box p={0.7} display="flex" alignItems="center">
                  <BedtimeIcon fontSize="small" />
                  <Typography pl={0.5}>{shop.budget}</Typography>
                </Box>
              </Box>
              <Box p={0.7} pb={1.3} display="flex" alignItems="center">
                <Rating
                  name="half-rating-read"
                  defaultValue={shop.rate}
                  precision={0.1}
                  readOnly
                />
                <Typography pl={1}>{shop.rate}</Typography>
              </Box>
            </Box>
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

import { Box, Typography, Avatar, Rating, styled } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import useFirebase from "@/lib/useFirebase";

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
    <Box p={3}>
      {shops.map((shop: Shop) => (
        <Box
          key={shop.id}
          width="30%"
          sx={{ backgroundColor: "#ffffff", borderRadius: 5 }}
        >
          <Box display="flex" alignItems="center" p={1}>
            <Avatar src={shop.user.image ? shop.user.image : ""} alt="" />
            <Typography pl={1.5}>{shop.user.name}</Typography>
          </Box>
          <StyledImage src={"../img/top/top2.png"} />
          <Typography p={0.7}>{shop.name}</Typography>
          <Typography p={0.7}>{shop.address}</Typography>
          <Typography p={0.7}>{shop.budget}</Typography>
          <Rating
            name="half-rating-read"
            defaultValue={shop.rate}
            precision={0.5}
            readOnly
            sx={{ p: 1 }}
          />
        </Box>
      ))}
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

import useRate from "@/lib/useRate";
import {
  Box,
  Card,
  Typography,
  styled,
  Link,
  Grid,
  Rating,
} from "@mui/material";

interface Shop {
  id: string;
  image: string;
  name: string;
  prefecture: string;
  rate: number;
}

const ShopRank = () => {
  const { documents: shops } = useRate("Shop");

  return (
    <Box width="100%" mb={2}>
      <Box display="flex" justifyContent="space-between" p={15} pt={5} pb={2}>
        <Typography fontFamily="游ゴシック" fontSize="1.5rem" fontWeight="bold">
          人気のお店 ランキング
        </Typography>
        <StyledLink href={"/menu/shop"}>お店をもっと見る</StyledLink>
      </Box>
      <Box pr={15} pl={15} display="flex">
        <Grid container spacing={2.5}>
          {shops.map((shop: Shop) => (
            <Grid
              item
              xs={12}
              md={2.4}
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
                <StyledImage src={shop.image} />
                <Box height="5.5rem">
                  <Typography
                    pt={1.5}
                    pl={1.8}
                    fontFamily="游ゴシック"
                    fontWeight="bold"
                    fontSize="1rem"
                  >
                    {shop.name}
                  </Typography>
                  <Typography
                    pt={1.2}
                    pl={1.8}
                    fontFamily="游ゴシック"
                    fontWeight="bold"
                    fontSize="0.85rem"
                    color="GrayText"
                  >
                    {shop.prefecture}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" p={1.2}>
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
    </Box>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: "游ゴシック",
  fontWeight: 500,
  fontSize: "1.2rem",
  marginLeft: 2,
}));

const StyledImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "9rem",
  objectFit: "cover",
}));

export default ShopRank;

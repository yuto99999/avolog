import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  styled,
  Link,
} from "@mui/material";

const ShopRank = () => {
  return (
    <Box width="100%" mb={2}>
      <Box display="flex" justifyContent="space-between" p={15} pt={5} pb={2}>
        <Typography fontFamily="游ゴシック" fontSize="1.5rem" fontWeight="bold">
          人気のお店 ランキング
        </Typography>
        <StyledLink href={"/menu/shop"}>お店をもっと見る</StyledLink>
      </Box>
      <Box pr={15} pl={15}>
        <Card sx={{ width: "14rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="130"
              image="../img/top/top1.png"
            />
            <CardContent>
              <Typography
                component="div"
                fontFamily="游ゴシック"
                fontSize="1.3rem"
                fontWeight="bold"
              >
                アボカド食堂
              </Typography>
              <Typography
                color="text.secondary"
                fontFamily="游ゴシック"
                fontSize=".9rem"
                fontWeight="bold"
              >
                東京都千代田区
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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

export default ShopRank;

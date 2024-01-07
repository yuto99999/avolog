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

const RecipeRank = () => {
  return (
    <Box width="100%" mb={5}>
      <Box display="flex" justifyContent="space-between" p={15} pt={5} pb={2}>
        <Typography fontFamily="游ゴシック" fontSize="1.5rem" fontWeight="bold">
          人気のレシピ ランキング
        </Typography>
        <StyledLink href={"/menu/recipe"}>レシピをもっと見る</StyledLink>
      </Box>
      <Box pr={15} pl={15}>
        <Card sx={{ width: "14rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="130"
              image="../img/top/top3.png"
            />
            <CardContent>
              <Typography
                component="div"
                fontFamily="游ゴシック"
                fontSize="1.3rem"
                fontWeight="bold"
              >
                アボカドサーモン丼
              </Typography>
              <Typography
                color="text.secondary"
                fontFamily="游ゴシック"
                fontSize=".9rem"
                fontWeight="bold"
              >
                難易度1
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

export default RecipeRank;

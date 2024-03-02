"use client"
import useDetail from "@/lib/useDetail";
import { Box, Divider, Typography, styled, Link } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import BackButton from "../Shop/ConditionBtn/backButton";

interface Detail {
  id: string;
  image: string;
  genre: string;
  name: string;
  intro: string;
  item: string;
  make: string;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
}

const Top = ({ docId }: { docId: string }) => {
  const { documents: detail } = useDetail("Recipe", docId);
  return (
    <>
      {detail.map((detail: Detail) => (
        <Box key={detail.id} display="flex" justifyContent="space-between" pt={25}>
          <StyledImage src={detail.image} />
          <Box width="48%">
            <Box display="flex" alignItems="center" pt={1}>
              <Typography pl={1.5} fontFamily="游ゴシック" fontSize="1.3rem">
                {detail.name}
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" alignItems="center" pt={1}>
              <Typography pl={1.5} fontFamily="游ゴシック" fontSize="1.3rem">
                {detail.item}
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" alignItems="center" pt={1}>
              <Typography pl={1.5} fontFamily="游ゴシック" fontSize="1.3rem">
                {detail.make}
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" justifyContent="right">
              <BackButton />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

const StyledDivider = {
  marginTop: 2,
  marginBottom: 2,
};

const StyledImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "48%",
  height: "26rem",
  objectFit: "cover",
}));

export default Top;

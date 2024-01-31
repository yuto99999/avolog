import useDetail from "@/lib/useDetail";
import { Box, Divider, Typography, styled, Link } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import PlaceIcon from "@mui/icons-material/Place";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import PhoneIcon from "@mui/icons-material/Phone";
import TrainIcon from "@mui/icons-material/Train";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BackButton from "../ConditionBtn/backButton";

interface Detail {
  id: string;
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

const Top = ({ docId }: { docId: string }) => {
  const { documents: detail } = useDetail("Shop", docId);
  return (
    <>
      {detail.map((detail: Detail) => (
        <Box key={detail.id} display="flex" justifyContent="space-between">
          <StyledImage src={detail.image} />
          <Box width="48%">
            <Box display="flex" alignItems="center" pt={1}>
              <PlaceIcon fontSize="medium" />
              <Typography
                pl={1.5}
                fontFamily="游ゴシック"
                fontSize="1.3rem"
              >
                {detail.address}
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" alignItems="center" pt={1}>
              <TrainIcon fontSize="medium" />
              <Typography
                pl={1.5}
                fontFamily="游ゴシック"
                fontSize="1.3rem"
              >
                渋谷駅
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" pt={0.3}>
              <Box display="flex" alignItems="center">
                <LightModeIcon fontSize="medium" />
                <Typography
                  pl={1.5}
                  fontFamily="游ゴシック"
                  fontSize="1.3rem"
                >
                  {detail.budgetL}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" pl={3}>
                <BedtimeIcon fontSize="medium" />
                <Typography
                  pl={1.5}
                  fontFamily="游ゴシック"
                  fontSize="1.3rem"
                >
                  {detail.budgetD}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Box display="flex" alignItems="center" pt={1}>
              <PhoneIcon fontSize="medium" />
              <Typography
                pl={1.5}
                fontFamily="游ゴシック"
                fontSize="1.3rem"
              >
                XXX-XXXX-XXXX
              </Typography>
            </Box>
            <Divider sx={{ ...StyledDivider }} />
            <Link
              href={"https://nextjs.org/"}
              target="blank"
              rel="noopener noreferrer"
            >
              <Box display="flex" alignItems="center" pt={1}>
                <OpenInNewIcon fontSize="medium" />
                <Typography
                  pl={1.5}
                  fontFamily="游ゴシック"
                  fontSize="1.3rem"
                >
                  https://nextjs.org/
                </Typography>
              </Box>
            </Link>
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

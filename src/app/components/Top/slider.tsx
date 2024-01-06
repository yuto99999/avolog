import * as React from "react";
import { Box, styled } from "@mui/material";
import { SlideList } from "@/data/SliderList";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

const Slider = () => (
  <>
    <Box
      component="div"
      width="100%"
      height="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt="6rem"
    >
      <Splide
        aria-label="トップ画像"
        options={{
          autoplay: true,
          interval: 3000,
          type: "loop",
          padding: "35%",
        }}
      >
        {SlideList.map((src, index) => (
          <SplideSlide key={index}>
            <StyledImage className="slide-img" src={src} />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  </>
);

const StyledImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "95%",
  height: "13rem",
  objectFit: "cover",
  borderRadius: "1rem",
}));
export default Slider;

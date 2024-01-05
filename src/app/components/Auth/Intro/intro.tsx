"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

const Intro = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push("/auth/login");
  }

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "url(../img/AvoLogo1.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <Box
        width="40%"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={8}
        pb={8}
        sx={{ opacity: 0.95, borderRadius: 5 }}
      >
        <Typography>Intro</Typography>
        <Button
          variant="contained"
          onClick={() => {
            goLogin();
          }}
          sx={{
            width: "50%",
            mt: 4,
            mb: 4,
            fontSize: "1.3rem",
            fontFamily: "游ゴシック",
            fontWeight: 600,
            borderRadius: "5rem",
          }}
        >
          次へ
        </Button>
      </Box>
    </Box>
  );
};

export default Intro;

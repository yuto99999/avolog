"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Box, Button, styled, Link, Typography, Alert } from "@mui/material";

const Logout = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const doLogout = () => {
    signOut(auth)
      .then(() => {
        setSuccess(true);
        setError(false);
        console.log("ログアウト成功");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

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
        <Typography
          fontSize="2.5rem"
          fontFamily="游ゴシック"
          fontWeight="bold"
          color="#000000"
          mb={2.5}
        >
          ログアウト
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            doLogout();
          }}
          sx={{
            width: "100%",
            mt: 4,
            mb: 4,
            fontSize: "1.3rem",
            fontFamily: "游ゴシック",
            fontWeight: 600,
            borderRadius: "5rem",
          }}
        >
          ログアウト
        </Button>
      </Box>
    </Box>
  );
};

export default Logout;

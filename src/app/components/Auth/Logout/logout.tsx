"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Box, Button, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Logout = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const vertical = "top";
  const horizontal = "right";

  const doLogout = () => {
    signOut(auth)
      .then(() => {
        setSuccess(true);
        setError(false);
        console.log("ログアウト成功");
        setOpen(true);

        setTimeout(() => {
          router.push("/");
        }, 1200);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setOpen(true);
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            width: "50%",
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
      {success && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            ログアウトしました！
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            ログインに失敗しました
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Logout;

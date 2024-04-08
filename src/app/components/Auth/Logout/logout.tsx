"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LogoutBtn = () => {
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
        setOpen(true);
        setTimeout(() => {
          router.push("/");
        }, 1200);
        router.refresh();
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
    <>
      <Button
        onClick={() => {
          doLogout();
        }}
        sx={{ color: "black", fontSize: "1rem" }}
      >
        ログアウト
      </Button>
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
    </>
  );
};

export default LogoutBtn;

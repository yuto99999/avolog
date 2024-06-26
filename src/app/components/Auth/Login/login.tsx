"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Box,
  Typography,
  TextField,
  Button,
  styled,
  Link,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const vertical = "top";
  const horizontal = "right";

  const doLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(true);
        console.log(user);
        setOpen(true);
        setTimeout(() => {
          router.push("/");
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
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
          ログイン
        </Typography>
        <TextField
          required
          id="email"
          label="メールアドレス"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "50%", m: 1.5 }}
        />
        <TextField
          required
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "50%", m: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            doLogin();
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
          ログイン
        </Button>
        <Typography fontFamily="游ゴシック" fontWeight={500} fontSize="1rem">
          アカウントをお持ちではありませんか？
          <StyledLink href={"/auth/register"}>会員登録</StyledLink>
        </Typography>
      </Box>
      {success && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            ログインしました！
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

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: "游ゴシック",
  fontWeight: 500,
  fontSize: "1rem",
  marginLeft: 2,
}));

export default Login;

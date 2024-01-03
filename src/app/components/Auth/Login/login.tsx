"use client";
import * as React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  styled,
  Link,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const doLogin = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(true);
        setError(false);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
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
        <StyledBtnLink href={"/"}>
          <Button
            variant="contained"
            onClick={() => {
              doLogin();
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
            ログイン
          </Button>
        </StyledBtnLink>
        <Typography fontFamily="游ゴシック" fontWeight={500} fontSize="1rem">
          アカウントをお持ちではありませんか？
          <StyledLink href={"/auth/register"}>会員登録</StyledLink>
        </Typography>
      </Box>
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

const StyledBtnLink = styled(Link)(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  textDecoration: "none ",
}));

export default Login;

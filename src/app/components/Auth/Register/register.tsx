"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "@/lib/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const doRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setSuccess(true);
        setError(false);
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
          会員登録
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
        <StyledBtnLink href={"/auth/profile"}>
          <Button
            variant="contained"
            onClick={() => {
              doRegister();
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
            登録
          </Button>
        </StyledBtnLink>
        <Typography fontFamily="游ゴシック" fontWeight={500} fontSize="1rem">
          すでにアカウントをお持ちですか？
          <StyledLink href={"/auth/login"}>ログイン</StyledLink>
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
  textDecoration: "none",
}));

export default Register;

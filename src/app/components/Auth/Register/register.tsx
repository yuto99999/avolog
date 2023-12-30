"use client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
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
    <Box width="100%" height="100vh" bgcolor="#F5F4EE">
      <Box display="flex" flexDirection="column" alignItems="center" pt="11rem">
        <Typography
          fontSize="3rem"
          fontFamily="游ゴシック"
          fontWeight="bold"
          color="#2864F0"
          mb={2}
        >
          新規登録
        </Typography>
        <TextField
          required
          id="email"
          label="メールアドレス"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "25%", m: 1.5 }}
        />
        <TextField
          required
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "25%", m: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            doRegister();
          }}
          sx={{
            width: "25%",
            mt: 8,
            mb: 2,
            bgcolor: "#2864F0",
            fontSize: "1.3rem",
            fontFamily: "游ゴシック",
            fontWeight: 600,
            borderRadius: "5rem",
          }}
        >
          登録
        </Button>
        {success && (
          <Alert
            severity="success"
            sx={{
              width: "25%",
              mt: 5,
              fontSize: "1.2rem",
              fontFamily: "游ゴシック",
              fontWeight: 600,
              alignItems: "center",
            }}
          >
            登録しました
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            sx={{
              width: "25%",
              mt: 5,
              fontSize: "1.2rem",
              fontFamily: "游ゴシック",
              fontWeight: 600,
              alignItems: "center",
            }}
          >
            登録できませんでした
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Register;

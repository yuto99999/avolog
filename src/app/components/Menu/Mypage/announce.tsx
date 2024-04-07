"use client";
import {
  Box,
  Button,
  Card,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Announce = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <StyledCard>
        <TopMessage>
          マイページ閲覧にはログインまたは会員登録が必要です
        </TopMessage>
        <Field
          required
          id="email"
          label="メールアドレス"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          required
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Btn
          variant="contained"
          onClick={() => {
            doLogin();
          }}
        >
          ログイン
        </Btn>
        <BottomMessage>
          アカウントをお持ちではありませんか？
          <StyledLink href={"/auth/register"}>会員登録</StyledLink>
        </BottomMessage>
      </StyledCard>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "12rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "60%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: 25,
  boxShadow: "0 0 40px #F1F4E1"
}));

const TopMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "游ゴシック",
  fontWeight: 500,
  fontSize: "1.7rem",
  paddingTop: 30,
  paddingBottom: 15,
  letterSpacing: 1,
}));

const Btn = styled(Button)(({ theme }) => ({
  width: "40%",
  fontSize: "1.3rem",
  fontFamily: "游ゴシック",
  fontWeight: 600,
  borderRadius: "5rem",
  marginTop: 60,
  marginBottom: 30,
}));

const Field = styled(TextField)(({ theme }) => ({
  width: "40%",
  marginTop: 25,
}));

const BottomMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "游ゴシック",
  fontWeight: 500,
  fontSize: "1.3rem",
  marginBottom: 30,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: "游ゴシック",
  fontWeight: 500,
  fontSize: "1.3rem",
  marginLeft: 2,
}));

export default Announce;

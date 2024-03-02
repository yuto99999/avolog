import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, styled } from "@mui/material";
import Link from "next/link";

const LoginBtn = () => {
  const router = useRouter();

  return (
    <BtnBox>
      <Link href={"/auth/login"}>
        <Button variant="contained">ログイン</Button>
      </Link>
    </BtnBox>
  );
};

const BtnBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
}));
export default LoginBtn;

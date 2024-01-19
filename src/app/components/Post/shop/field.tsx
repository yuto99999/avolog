"use client";
import React, { useState } from "react";
import { store } from "@/lib/firebase";
import useProfile from "@/lib/useProfile";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { PrefList } from "@/data/Prefectures";
import { BudgetList } from "@/data/Budget";
import { GenreList } from "@/data/Genre";
import {
  Box,
  TextField,
  Button,
  Rating,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Field = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [genre, setGenre] = useState("");
  const [budgetL, setBudgetL] = useState("");
  const [budgetD, setBudgetD] = useState("");
  const [rate, setRate] = useState(0);

  const vertical = "top";
  const horizontal = "right";

  const profileData = useProfile();
  const profile = profileData.profile;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firestore = store;

    try {
      const docRef = collection(firestore, "Shop");

      await addDoc(docRef, {
        name,
        prefecture,
        address,
        genre,
        budgetL,
        budgetD,
        rate,
        createdAt: Timestamp.fromDate(new Date()),
        user: {
          name: profile?.name,
          image: profile?.image,
          uid: profile?.uid,
        },
      });
      setSuccess(true);
      setOpen(true);
    } catch (e) {
      console.log(e);
      setError(true);
      setOpen(true);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPrefecture(event.target.value as string);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setBudgetL(event.target.value as string);
  };

  const handleChange3 = (event: SelectChangeEvent) => {
    setBudgetD(event.target.value as string);
  };

  const handleChange4 = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
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
      component="form"
      onSubmit={handleSubmit}
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
        width="60%"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        pt={8}
        pb={8}
        sx={{ opacity: 0.95, borderRadius: 5 }}
      >
        <StyledBox>
          <StyledTitle>店名</StyledTitle>
          <TextField
            id="outlined-basic"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "50%" }}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>都道府県</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={prefecture}
              onChange={handleChange}
            >
              {PrefList.map((prefecture) => (
                <MenuItem key={prefecture.prefCode} value={prefecture.prefName}>
                  {prefecture.prefName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
        <StyledBox>
          <StyledTitle>住所</StyledTitle>
          <TextField
            id="outlined-basic"
            variant="outlined"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ width: "50%" }}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>ジャンル</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              onChange={handleChange4}
            >
              {GenreList.map((genre) => (
                <MenuItem key={genre.code} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
        <StyledBox>
          <StyledTitle>予算</StyledTitle>
          <Box width="50%" display="flex" alignItems="center">
            <LightModeIcon fontSize="large" />
            <FormControl sx={{ width: "40%", ml: "2%", mr: "2%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={budgetL}
                onChange={handleChange2}
              >
                {BudgetList.map((budget) => (
                  <MenuItem key={budget.code} value={budget.price}>
                    {budget.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <BedtimeIcon fontSize="large" />
            <FormControl sx={{ width: "40%", ml: "2%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={budgetD}
                onChange={handleChange3}
              >
                {BudgetList.map((budget) => (
                  <MenuItem key={budget.code} value={budget.price}>
                    {budget.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </StyledBox>
        <StyledBox>
          <StyledTitle>評価</StyledTitle>
          <Rating
            defaultValue={3}
            precision={0.1}
            value={rate}
            size="large"
            onChange={(e, newValue) => {
              setRate(newValue !== null ? newValue : 0);
            }}
          />
        </StyledBox>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "40%",
            fontSize: "1.3rem",
            fontFamily: "游ゴシック",
            fontWeight: 600,
            borderRadius: "5rem",
          }}
        >
          投稿
        </Button>
      </Box>
      {/* {success && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            投稿しました！
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
            投稿に失敗しました
          </Alert>
        </Snackbar>
      )} */}
    </Box>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  component: "label",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  marginBottom: "2rem",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: "30%",
  paddingLeft: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  fontFamily: "游ゴシック",
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

export default Field;

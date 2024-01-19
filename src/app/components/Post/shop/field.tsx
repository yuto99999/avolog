"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { store, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  Avatar,
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
  const [image, setImage] = useState<File | null>();
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

  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const firestore = store;
    const firestorage = storage;

    try {
      const docRef = collection(firestore, "Shop");

      if (image) {
        const imageRef = ref(firestorage, image.name);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then(async (url) => {
            await addDoc(docRef, {
              image:url,
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
          });
        });
      } else {
        await addDoc(docRef, {
          image: "",
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
      }
      setSuccess(true);
      setOpen(true);
      setTimeout(() => {
        router.push("/menu/shop");
      }, 1200);
    } catch (e) {
      console.log(e);
      setError(true);
      setOpen(true);
    }
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  const handleChangePref = (event: SelectChangeEvent) => {
    setPrefecture(event.target.value as string);
  };

  const handleChangeG = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  const handleChangeBL = (event: SelectChangeEvent) => {
    setBudgetL(event.target.value as string);
  };

  const handleChangeBD = (event: SelectChangeEvent) => {
    setBudgetD(event.target.value as string);
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
        mt={15}
        mb={15}
        pt={6}
        pb={6}
        sx={{ opacity: 0.95, borderRadius: 5 }}
      >
        <StyledImgBox>
          <Box width="30%" pl="10%">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChangeImg}
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <StyledImgBtn>写真を追加</StyledImgBtn>
            </label>
          </Box>
          <Avatar
            variant="square"
            src={image ? URL.createObjectURL(image) : ""}
            sx={{ width: "50%", height: "auto" }}
          />
        </StyledImgBox>
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
              onChange={handleChangePref}
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
              onChange={handleChangeG}
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
                onChange={handleChangeBL}
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
                onChange={handleChangeBD}
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
            width: "50%",
            fontSize: "1.3rem",
            fontFamily: "游ゴシック",
            fontWeight: 600,
            borderRadius: "5rem",
          }}
        >
          投稿
        </Button>
      </Box>
      {success && (
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
      )}
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

const StyledImgBtn = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  fontFamily: "游ゴシック",
  fontSize: "1.5rem",
  fontWeight: "bold",
  variant: "text",
  cursor: "pointer",
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "100%",
  component: "label",
  display: "flex",
  justifyContent: "cenetr",
  marginBottom: "2rem",
}));

export default Field;

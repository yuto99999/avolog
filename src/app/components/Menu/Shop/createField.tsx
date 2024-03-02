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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { RateList } from "@/data/RateList";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateField = () => {
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

  const handleSubmit = async (e: any) => {
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
              image: url,
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
        router.push("/");
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

  const handleChangeR = (event: SelectChangeEvent<number>) => {
    setRate(event.target.value as number);
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
    <Container component="form" onSubmit={handleSubmit}>
      <StyledBox>
        <ItemBox>
          <Title>写真</Title>
          <Box width={{ xs: "75%", sm: "50%" }}>
            <Box
              component="input"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChangeImg}
              display="none"
            />
            <Box component="label" htmlFor="image">
              <StyledAvatar
                variant="rounded"
                src={image ? URL.createObjectURL(image) : ""}
              >
                <AddCircleIcon fontSize="large" />
              </StyledAvatar>
            </Box>
          </Box>
        </ItemBox>
        <ItemBox>
          <Title>店名</Title>
          <ItemField
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ItemBox>
        <ItemBox>
          <Title>都道府県</Title>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={prefecture} onChange={handleChangePref}>
              {PrefList.map((prefecture) => (
                <MenuItem key={prefecture.prefCode} value={prefecture.prefName}>
                  {prefecture.prefName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ItemBox>
        <ItemBox>
          <Title>住所</Title>
          <ItemField
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </ItemBox>
        <ItemBox>
          <Title>ジャンル</Title>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={genre} onChange={handleChangeG}>
              {GenreList.map((genre) => (
                <MenuItem key={genre.code} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ItemBox>
        <ItemBox>
          <Title>予算</Title>
          <Box width="50%" display="flex" alignItems="center">
            <LightModeIcon fontSize="large" />
            <FormControl sx={{ width: "40%", ml: "2%", mr: "2%" }}>
              <Select required value={budgetL} onChange={handleChangeBL}>
                {BudgetList.map((budget) => (
                  <MenuItem key={budget.code} value={budget.price}>
                    {budget.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <BedtimeIcon fontSize="large" />
            <FormControl sx={{ width: "40%", ml: "2%" }}>
              <Select required value={budgetD} onChange={handleChangeBD}>
                {BudgetList.map((budget) => (
                  <MenuItem key={budget.code} value={budget.price}>
                    {budget.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ItemBox>
        <ItemBox>
          <Title>評価</Title>
          <Rating
            defaultValue={3}
            precision={0.1}
            value={rate}
            size="large"
            onChange={(e, newValue) => {
              setRate(newValue !== null ? newValue : 0);
            }}
          />
          <FormControl sx={{ width: "10%", ml: "2%" }}>
            <Select value={rate} onChange={handleChangeR}>
              {RateList.map((rate) => (
                <MenuItem key={rate.code} value={rate.rate}>
                  {rate.rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ItemBox>
        <PostBtn variant="contained" type="submit">
          投稿
        </PostBtn>
      </StyledBox>
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
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url(../img/AvoLogo1.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "100%",
  flexDirection: "column",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "60%",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "7rem",
  marginBottom: "7rem",
  paddingTop: "4rem",
  paddingBottom: "4rem",
  opacity: 0.95,
  borderRadius: "1.5rem",
}));

const ItemBox = styled(Box)(({ theme }) => ({
  width: "100%",
  component: "label",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  marginBottom: "2rem",
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "30%",
  paddingLeft: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  fontFamily: "游ゴシック",
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const ItemField = styled(TextField)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "75%",
  },
}));

const PostBtn = styled(Button)(({ theme }) => ({
  width: "50%",
  fontSize: "1.3rem",
  fontFamily: "游ゴシック",
  fontWeight: 600,
  borderRadius: "5rem",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "13rem",
  height: "13rem",
  [theme.breakpoints.down("md")]: {
    width: "12rem",
    height: "12rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "10rem",
    height: "10rem",
  },
}));

export default CreateField;

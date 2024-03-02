"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { store, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useProfile from "@/lib/useProfile";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { GenreList } from "@/data/Genre";
import {
  Box,
  TextField,
  Button,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  const [intro, setIntro] = useState("");
  const [item, setItem] = useState("");
  const [genre, setGenre] = useState("");
  const [make, setMake] = useState("");

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
      const docRef = collection(firestore, "Recipe");

      if (image) {
        const imageRef = ref(firestorage, image.name);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then(async (url) => {
            await addDoc(docRef, {
              image: url,
              name,
              intro,
              item,
              genre,
              make,
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
          intro,
          item,
          genre,
          make,
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

  const handleChangeG = (event: SelectChangeEvent) => {
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
          <Title>レシピのタイトル</Title>
          <ItemField
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Title>紹介文</Title>
          <ItemField
            multiline
            rows={5}
            required
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </ItemBox>
        <ItemBox>
          <Title>材料</Title>
          <ItemField
            placeholder="例)アボカド 1個"
            multiline
            rows={15}
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </ItemBox>
        <ItemBox>
          <Title>作り方</Title>
          <ItemField
            placeholder="例)1. アボカドを4等分する "
            multiline
            rows={15}
            required
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
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

"use client";

import React, { useMemo, useRef, useState } from "react";
import { store, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  Button,
  Box,
  TextField,
  styled,
  Typography,
  Snackbar,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Rating,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useProfile from "@/lib/useProfile";
import { PrefList } from "@/data/Prefectures";
import { GenreList } from "@/data/Genre";
import { BudgetList } from "@/data/Budget";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from "@mui/icons-material/LightMode";
import { RateList } from "@/data/RateList";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SelectBtnProps {
  clicked?: boolean;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreatePost = () => {
  const [name, setName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [genre, setGenre] = useState("");
  const [budgetL, setBudgetL] = useState("");
  const [budgetD, setBudgetD] = useState("");
  const [rate, setRate] = useState(0);

  const [budget, setBudget] = useState("");
  const [recipe1, setRecipe1] = useState("");
  const [recipe2, setRecipe2] = useState("");
  const [recipe3, setRecipe3] = useState("");
  const [recipe4, setRecipe4] = useState("");
  const [point, setPoint] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(true);

  const profileData = useProfile();
  const profile = profileData.profile;

  const [inputFiles, setInputFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedFileArray: File[] = useMemo(() => {
    return inputFiles ? [...Array.from(inputFiles)] : [];
  }, [inputFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!inputRef.current?.files) return;
    const newFileArray = [
      ...selectedFileArray,
      ...Array.from(e.target.files),
    ].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index // 重複を削除
    );
    const dt = new DataTransfer();
    newFileArray.forEach((file) => dt.items.add(file));
    inputRef.current.files = dt.files; // input内のFileListを更新
    setInputFiles(dt.files); // Reactのstateを更新
  };

  const handleDelete = (index: number) => {
    if (!inputRef.current?.files) return;
    const dt = new DataTransfer();
    selectedFileArray.forEach((file, i) => i !== index && dt.items.add(file));
    inputRef.current.files = dt.files; // input内のFileListを更新
    setInputFiles(dt.files); // Reactのstateを更新
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firestore = store;
    const firestorage = storage;

    let uploadFileUrls: string[] = [];

    const uploadPromises = selectedFileArray.map(async (image) => {
      const imageRef = ref(firestorage, image.name);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      uploadFileUrls.push(url);
    });

    await Promise.all(uploadPromises);

    try {
      const docRef = collection(firestore, clicked ? "Shop" : "Recipe");
      (await clicked)
        ? addDoc(docRef, {
            imageUrl: uploadFileUrls,
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
          })
        : addDoc(docRef, {
            imageUrl: uploadFileUrls,
            name,
            genre,
            recipe: {
              recipe1,
              recipe2,
              recipe3,
              recipe4,
            },
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return setOpen(false);
    }
    setOpen(false);
  };

  const SelectBtn = ({
    clicked,
    children,
    onClick,
    ...props
  }: SelectBtnProps) => {
    return (
      <StyledButton
        {...props}
        onClick={onClick}
        style={{
          fontWeight: clicked ? 700 : 400,
          opacity: clicked ? 1 : 0.5,
        }}
      >
        {children}
      </StyledButton>
    );
  };

  const handleChangePref = (event: SelectChangeEvent) => {
    setPrefecture(event.target.value as string);
  };

  const handleChangeGenre = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  const handleChangeBL = (event: SelectChangeEvent) => {
    setBudgetL(event.target.value as string);
  };

  const handleChangeBD = (event: SelectChangeEvent) => {
    setBudgetD(event.target.value as string);
  };

  const handleChangeBudget = (event: SelectChangeEvent) => {
    setBudget(event.target.value as string);
  };

  const handleChangeRate = (event: SelectChangeEvent<number>) => {
    setRate(event.target.value as number);
  };

  return clicked ? (
    <Container component="form" onSubmit={handleSubmit}>
      <SmallContainer>
        <BtnContainer>
          <SelectBtn onClick={() => setClicked(true)} clicked={clicked}>
            お店
          </SelectBtn>
          <SelectBtn onClick={() => setClicked(false)} clicked={!clicked}>
            レシピ
          </SelectBtn>
        </BtnContainer>
        <StyledBox>
          <StyledTitle>写真</StyledTitle>
          <Box display="flex" flexDirection="column">
            <Box
              component="input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              ref={inputRef}
            />
            <Box>
              {selectedFileArray.map((file, index) => (
                <Box key={file.name} display="flex" alignItems="center">
                  <Typography>{file.name}</Typography>
                  <DelateBtn onClick={() => handleDelete(index)}>
                    削除
                  </DelateBtn>
                </Box>
              ))}
            </Box>
          </Box>
        </StyledBox>
        <StyledBox>
          <StyledTitle>店名</StyledTitle>
          <StyledField
            // required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>都道府県</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={prefecture} onChange={handleChangePref}>
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
          <StyledField
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>ジャンル</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={genre} onChange={handleChangeGenre}>
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
          <FormControl sx={{ width: "10%", ml: "2%" }}>
            <Select value={rate} onChange={handleChangeRate}>
              {RateList.map((rate) => (
                <MenuItem key={rate.code} value={rate.rate}>
                  {rate.rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
        <StyledBtn type="submit" variant="contained">
          投稿
        </StyledBtn>
      </SmallContainer>
      {success && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success" onClose={handleClose}>
            投稿しました！
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error" onClose={handleClose}>
            投稿に失敗しました
          </Alert>
        </Snackbar>
      )}
    </Container>
  ) : (
    <Container component="form" onSubmit={handleSubmit}>
      <SmallContainer>
        <BtnContainer>
          <SelectBtn onClick={() => setClicked(true)} clicked={clicked}>
            お店
          </SelectBtn>
          <SelectBtn onClick={() => setClicked(false)} clicked={!clicked}>
            レシピ
          </SelectBtn>
        </BtnContainer>
        <StyledBox>
          <StyledTitle>写真</StyledTitle>
          <Box display="flex" flexDirection="column">
            <Box
              component="input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              ref={inputRef}
            />
            <Box>
              {selectedFileArray.map((file, index) => (
                <Box key={file.name} display="flex" alignItems="center">
                  <Typography>{file.name}</Typography>
                  <DelateBtn onClick={() => handleDelete(index)}>
                    削除
                  </DelateBtn>
                </Box>
              ))}
            </Box>
          </Box>
        </StyledBox>
        <StyledBox>
          <StyledTitle>レシピ名</StyledTitle>
          <StyledField
            // required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>予算</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={budget} onChange={handleChangeBudget}>
              {BudgetList.map((budget) => (
                <MenuItem key={budget.code} value={budget.price}>
                  {budget.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
        <StyledBox>
          <StyledTitle>ジャンル</StyledTitle>
          <FormControl sx={{ width: "50%" }}>
            <Select required value={genre} onChange={handleChangeGenre}>
              {GenreList.map((genre) => (
                <MenuItem key={genre.code} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledBox>
        <StyledBox>
          <StyledTitle>作り方①</StyledTitle>
          <StyledField
            // required
            multiline
            rows={3}
            value={recipe1}
            onChange={(e) => setRecipe1(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>作り方②</StyledTitle>
          <StyledField
            // required
            multiline
            rows={3}
            value={recipe2}
            onChange={(e) => setRecipe2(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>作り方③</StyledTitle>
          <StyledField
            // required
            multiline
            rows={3}
            value={recipe3}
            onChange={(e) => setRecipe3(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>作り方④</StyledTitle>
          <StyledField
            // required
            multiline
            rows={3}
            value={recipe4}
            onChange={(e) => setRecipe4(e.target.value)}
          />
        </StyledBox>
        <StyledBox>
          <StyledTitle>コツ・ポイント</StyledTitle>
          <StyledField
            // required
            multiline
            rows={2}
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
        </StyledBox>
        <StyledBtn type="submit" variant="contained">
          投稿
        </StyledBtn>
      </SmallContainer>
      {success && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success" onClose={handleClose}>
            投稿しました！
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error" onClose={handleClose}>
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
  backgroundImage: "url(../img/AvoLogo1.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundColor: "#FBF4E5",
}));

const SmallContainer = styled(Box)(({ theme }) => ({
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

const BtnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "4rem",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    marginBottom: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.8rem",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  marginBottom: "3rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: "40%",
  display: "flex",
  alignItems: "center",
  justifyContent: "cenetr",
  paddingLeft: "10%",
  fontFamily: "游ゴシック",
  fontSize: "1.5rem",
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    width: "35%",
    paddingLeft: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "75%",
    paddingLeft: "0",
    paddingBottom: "0.5rem",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#000",
  fontSize: "1.9rem",
  fontFamily: "游ゴシック",
  letterSpacing: 1,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const DelateBtn = styled(Button)(({ theme }) => ({
  color: "#000",
  marginLeft: "1rem",
}));

const StyledField = styled(TextField)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "75%",
  },
}));

const StyledBtn = styled(Button)(({ theme }) => ({
  width: "35%",
  marginTop: "1.5rem",
  fontSize: "1.3rem",
  fontFamily: "游ゴシック",
  fontWeight: 600,
  borderRadius: "5rem",
  [theme.breakpoints.down("md")]: {
    width: "50%",
    marginTop: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "75%",
    marginTop: "0.5rem",
  },
}));

export default CreatePost;

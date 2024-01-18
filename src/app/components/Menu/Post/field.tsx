"use client";
import React, { useState } from "react";
import { store } from "@/lib/firebase";
import useProfile from "@/lib/useProfile";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { PrefList } from "@/data/Prefectures";
import { BudgetList } from "@/data/Budget";
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
  Divider,
  List,
  ListItem,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const style = {
  p: 0,
  width: "100%",
  maxWidth: 700,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

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
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
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
        category,
        budget,
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
    setBudget(event.target.value as string);
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
      sx={style}
    >
      <List sx={style} aria-label="mailbox folders">
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </StyledList>
        <Divider component="li" light />
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={prefecture}
                onChange={handleChange}
              >
                {PrefList.map((prefecture) => (
                  <MenuItem
                    key={prefecture.prefCode}
                    value={prefecture.prefName}
                  >
                    {prefecture.prefName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </StyledList>
        <Divider component="li" light />
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        </StyledList>
        <Divider component="li" light />
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Box>
        </StyledList>
        <Divider component="li" light />
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <FormControl sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={budget}
                onChange={handleChange2}
              >
                {BudgetList.map((budget) => (
                  <MenuItem key={budget.code} value={budget.price}>
                    {budget.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </StyledList>
        <Divider component="li" light />
        <StyledList>
          <Box component="label" display="flex" alignItems="center">
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.1}
              value={rate}
              onChange={(e, newValue) => {
                setRate(newValue !== null ? newValue : 0);
              }}
            />
          </Box>
        </StyledList>
        <Divider component="li" light />
      </List>
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

const StyledList = styled(ListItem)(({ theme }) => ({
  height: 80,
}));

export default Field;

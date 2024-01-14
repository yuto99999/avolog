"use client";
import React, { useState } from "react";
import { store } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { PrefList } from "@/data/Prefectures";
import { BudgetList } from "@/data/Budget";
import {
  Box,
  Typography,
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

const style = {
  p: 0,
  width: "100%",
  maxWidth: 700,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const Field = () => {
  const [name, setName] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [rate, setRate] = useState(0);

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
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPrefecture(event.target.value as string);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setBudget(event.target.value as string);
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
              precision={0.5}
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
    </Box>
  );
};

const StyledList = styled(ListItem)(({ theme }) => ({
  height: 80,
}));

export default Field;

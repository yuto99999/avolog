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
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const Post = () => {
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
    <Box component="form" onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <Typography component="label">
          店名 :{" "}
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Typography>
        <Typography component="label">
          都道府県 :{" "}
          <FormControl>
            <InputLabel id="demo-simple-select-label">エリア</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={prefecture}
              label="都道府県"
              onChange={handleChange}
            >
              {PrefList.map((prefecture) => (
                <MenuItem key={prefecture.prefCode} value={prefecture.prefName}>
                  {prefecture.prefName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Typography>
        <Typography component="label">
          住所 :{" "}
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Typography>
        <Typography component="label">
          カテゴリー :{" "}
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Typography>
        <Typography component="label">
          予算 :{" "}
          <FormControl>
            <InputLabel id="demo-simple-select-label">予算</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={budget}
              label="予算"
              onChange={handleChange2}
            >
              {BudgetList.map((budget) => (
                <MenuItem key={budget.code} value={budget.price}>
                  {budget.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Typography>
        <Box component="label">
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
      </Box>
      <Button variant="contained" type="submit">
        送信
      </Button>
    </Box>
  );
};

export default Post;

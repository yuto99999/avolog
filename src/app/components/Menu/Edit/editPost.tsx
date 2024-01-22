"use client";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { store, storage } from "@/lib/firebase";
import { Box, Button } from "@mui/material";

const EditPost = ({ id }: { id: string }) => {
  const [name, setName] = useState("");

  const firestore = store;
  const docRef = doc(firestore, "Shop", id);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    updateDoc(docRef, {
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button className="button">更新</button>
    </form>
  );
};
export default EditPost;

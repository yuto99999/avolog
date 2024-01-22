"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import useUser from "@/lib/useUser";
import useProfile from "@/lib/useProfile";
import { store, storage } from "@/lib/firebase";
import { Typography, Box, TextField, Button, Avatar } from "@mui/material";

const Profile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const firestorage = storage;
  const firestore = store;

  const { user } = useUser();

  const profileData = useProfile();
  const profile = profileData.profile;

  useEffect(() => {
    if (profile && profile.name) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const uid = user!.uid;
      const docRef = collection(firestore, "Users");

      if (image) {
        const imageRef = ref(firestorage, image.name);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then(async (url) => {
            if (profile) {
              const userRef = doc(firestore, "Users", profile?.id);
              await updateDoc(userRef, {
                name,
                image: url,
              });
            } else {
              await addDoc(docRef, {
                name,
                image: url,
                uid,
              });
            }
          });
        });
      } else {
        if (profile) {
          const userRef = doc(firestore, "Users", profile?.id);
          await updateDoc(userRef, { name });
        } else {
          await addDoc(docRef, { name, image: "", uid });
        }
      }
      setSuccess(true);
      setError(false);
      console.log("プロフィール設定成功!");
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Box
      width="100%"
      height="100vh"
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
        width="65%"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={8}
        pb={8}
        sx={{ opacity: 0.95, borderRadius: 5 }}
      >
        <Typography
          textAlign="center"
          fontSize="2rem"
          fontFamily="游ゴシック"
          fontWeight={600}
          mb={2.5}
        >
          会員情報の確認・変更
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={
                image
                  ? URL.createObjectURL(image)
                  : profile
                  ? profile.image
                  : ""
              }
              alt="アイコン"
              sx={{ width: 80, height: 80, mr: 5 }}
            />
            <Box>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <label htmlFor="image">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    fontSize: "1.3rem",
                    fontFamily: "游ゴシック",
                    fontWeight: 600,
                    borderRadius: "5rem",
                    p: "0.5rem 3rem",
                  }}
                >
                  画像を選択
                </Button>
              </label>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <TextField
              required
              id="name"
              label="ユーザー名"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              sx={{ width: "100%", m: 1.5 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                mt: 4,
                mb: 4,
                fontSize: "1.3rem",
                fontFamily: "游ゴシック",
                fontWeight: 600,
                borderRadius: "5rem",
              }}
            >
              {profile ? "更新" : "作成"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

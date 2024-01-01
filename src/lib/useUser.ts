import React from "react";
import { auth } from "@/lib/firebase";

const useUser = () => {
  const user = auth.currentUser;

  if (user !== null) {
    const email = user.email;
    const uid = user.uid;

    const userInfo = {
      email,
      uid,
    };

    return { user: userInfo };
  } else {
    return { user };
  }
};

export default useUser;

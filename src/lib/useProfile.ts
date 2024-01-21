import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { store, auth } from "@/lib/firebase";

const useProfile = () => {
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid;
        const firestore = store;

        const q = query(
          collection(firestore, "Users"),
          where("uid", "==", userUid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setProfile(docData);
        });
      }
    });
  }, []);

  return { profile };
};

export default useProfile;

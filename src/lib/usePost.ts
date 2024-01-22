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

const usePost = () => {
  const [post, setPost] = useState<DocumentData | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid;
        const firestore = store;

        const q = query(
          collection(firestore, "Shop"),
          where("user.uid", "==", userUid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setPost(docData);
        });
      }
    });
  }, []);

  return { post };
};

export default usePost;
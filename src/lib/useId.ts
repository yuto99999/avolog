import { useState, useEffect } from "react";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { store, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useId = () => {
  const [posts, setPosts] = useState<DocumentData | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const firestore = store;
        const q = query(
          collection(firestore, "Shop"),
          where("user.uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(userPosts);
      }
    });
  }, []);

  return { posts };
};

export default useId;

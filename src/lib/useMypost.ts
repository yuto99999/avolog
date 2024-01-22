import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { store } from "@/lib/firebase";
import useUser from "./useUser";

const useMypost = (data: string) => {
  const [documents, setDocuments] = useState([]);

  const { user } = useUser();
  const uid = user!.uid;

  useEffect(() => {
    const firestore = store;
    const docRef = collection(firestore, data);
    const queryRef = query(
      docRef,
      where("user.uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      console.log(results);
      setDocuments(results);
    });
    return () => unsub();
  }, [data]);

  return { documents };
};

export default useMypost;

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { store } from "@/lib/firebase";

const useFirebase = (data: string, condition: string, type: "asc" | "desc") => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const firestore = store;
    const docRef = collection(firestore, data);
    const queryRef = query(docRef, orderBy(condition, type));
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

export default useFirebase;

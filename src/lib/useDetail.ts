import { useState, useEffect } from "react";
import { onSnapshot, doc, Timestamp } from "firebase/firestore";
import { store } from "@/lib/firebase";

interface Detail {
  id: string;
  address: string;
  image: string;
  budgetL: string;
  budgetD: string;
  genre: string;
  name: string;
  prefecture: string;
  rate: number;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
}

const useDetail = (data: string, docId: string) => {
  const [documents, setDocuments] = useState<Detail[]>([]);

  useEffect(() => {
    const firestore = store;
    const docRef = doc(firestore, data, docId);
    
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setDocuments([{ ...docSnap.data(), id: docSnap.id } as Detail]);
      } else {
        setDocuments([]);
      }
    });

    return () => unsub();
  }, [data, docId]);

  return { documents };
};

export default useDetail;

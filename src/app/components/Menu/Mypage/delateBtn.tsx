import { store } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Box, Button } from "@mui/material";

const DeleteBtn = ({ id }: { id: string }) => {
  const handleClick = async () => {
    const firestore = store;

    const docRef = doc(firestore, "Shop", id);

    await deleteDoc(docRef);
  };

  return (
    <Box>
      <Button onClick={handleClick} sx={{ color: "#000000" }}>
        削除
      </Button>
    </Box>
  );
};

export default DeleteBtn;

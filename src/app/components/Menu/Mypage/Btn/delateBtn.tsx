import React from "react";
import { store } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicPopover = ({ docId }: { docId: string }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const doDelete = async () => {
    const firestore = store;

    const docRef = doc(firestore, "Shop", docId);

    await deleteDoc(docRef);
  };

  return (
    <Box>
      <Button onClick={handleOpen} color="error">
        削除
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography p={1} fontFamily="游ゴシック" fontSize="1.1rem">
            この投稿を削除しますか？
          </Typography>
          <Box display="flex" justifyContent="right" gap={1} p={1} mr={2}>
            <Button onClick={doDelete} variant="contained">
              はい
            </Button>
            <Button onClick={handleClose} variant="outlined">
              いいえ
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicPopover;

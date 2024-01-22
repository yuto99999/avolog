import React from "react";
import { store } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Box, Button, Popover, Typography } from "@mui/material";

const BasicPopover = ({ docId }: { docId: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const doDelete = async () => {
    const firestore = store;

    const docRef = doc(firestore, "Shop", docId);

    await deleteDoc(docRef);
  };

  return (
    <Box>
      <Button aria-describedby={id} color="error" onClick={handleClick}>
        削除
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box width="22rem" p={2}>
          <Typography p={1} fontFamily="游ゴシック" >この投稿を削除しますか？</Typography>
          <Box  display="flex" justifyContent="right" gap={1} p={1}>
            <Button onClick={doDelete} variant="contained">
              はい
            </Button>
            <Button onClick={handleClose} variant="outlined">
              いいえ
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default BasicPopover;

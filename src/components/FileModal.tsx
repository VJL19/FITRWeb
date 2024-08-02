import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppDispatch } from "src/store/store";
import { handleFileModalClose } from "src/reducers/modal";
import { useDispatch } from "react-redux";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const FileModal = ({
  open,
  title,
  handleConfirmationUpload,
}: {
  open: boolean;
  title: string;
  handleConfirmationUpload: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Note: This action cannot be undone.
          </Typography>

          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              color="info"
              size="medium"
              onClick={() => {
                dispatch(handleFileModalClose());
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              size="medium"
              onClick={() => handleConfirmationUpload()}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default FileModal;

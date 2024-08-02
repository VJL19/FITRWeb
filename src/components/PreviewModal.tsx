import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppDispatch, RootState } from "src/store/store";
import { handlePreviewModalClose } from "src/reducers/modal";
import { useDispatch, useSelector } from "react-redux";
import thumbnail from "src/assets/thumbnail_no_img.jpg";
import { IMAGE_VALUES } from "src/utils/enums/IMAGE_VALUES";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "75%",
  maxHeight: "75%",
  overflowY: "scroll",
};

const PreviewModal = ({ open, title }: { open: boolean; title: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { AnnouncementTitle, AnnouncementImage, AnnouncementDescription } =
    useSelector(
      (state: RootState) => state.announcement.previewAnnouncementData
    );

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            sx={{ fontWeight: "bold" }}
            component="h2"
          >
            {title.toUpperCase()}
          </Typography>
          <CloseIcon
            fontSize="large"
            htmlColor={"#202020"}
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(handlePreviewModalClose())}
          />
        </Box>
        <Box sx={{ height: 300 }}>
          {AnnouncementImage !== "" && (
            <img
              src={
                AnnouncementImage === IMAGE_VALUES.DEFAULT_VALUE
                  ? thumbnail
                  : URL.createObjectURL(AnnouncementImage)
              }
              height={"auto"}
              width={"100%"}
            />
          )}
          <h1>{AnnouncementTitle}</h1>
          <Box dangerouslySetInnerHTML={{ __html: AnnouncementDescription }} />
        </Box>

        <br />
      </Box>
    </Modal>
  );
};
export default PreviewModal;

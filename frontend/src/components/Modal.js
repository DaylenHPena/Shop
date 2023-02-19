import { Box, Fade, Typography } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import "./Modal.css";

function Modal({ title, open, handleClose, children }) {
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box className="modal-body">
          <Typography variant="h4" align="center">
            {title}
          </Typography>
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
}

export default Modal

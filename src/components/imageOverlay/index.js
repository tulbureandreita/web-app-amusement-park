import React from "react";
import { Dialog, DialogContent, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageOverlay = ({
  open,
  imageObj,
  onClose,
  onToggleSelect,
  isSelected,
}) => {
  if (!imageObj) return null;

  const imageUrl = `/mock-images/${imageObj.filename}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div>
        <Button
          onClick={() => onToggleSelect(imageObj)}
          variant="contained"
          color={isSelected ? "secondary" : "primary"}
          style={{ marginTop: 16 }}
        >
          {isSelected ? "Uncheck" : "Check"}
        </Button>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent style={{ padding: 0, textAlign: "center" }}>
        <img
          src={imageUrl}
          alt="Full Size"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            width: "auto",
            height: "auto",
            display: "block",
            margin: "0 auto",
            objectFit: "contain",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageOverlay;

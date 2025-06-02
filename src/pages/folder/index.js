import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Checkbox, Modal } from "@mui/material";
import mockImageData from "../../mock/imageData";
import ImageOverlay from "../../components/imageOverlay";
import useStyles from "./styles";

const FolderPage = () => {
  const classes = useStyles();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const folder = mockImageData.find((f) => f.id === folderId);

  const [selectedImages, setSelectedImages] = useState([]);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedImageForOverlay, setSelectedImageForOverlay] = useState(null);

  const handleImageClickForOverlay = (imageObj) => {
    setSelectedImageForOverlay(imageObj);
  };

  const handleCloseOverlay = () => {
    setSelectedImageForOverlay(null);
  };

  const handleSelect = (imageObject) => {
    setSelectedImages((prevSelected) => {
      const isSelected = prevSelected.find((img) => img.id === imageObject.id);
      if (isSelected) {
        return prevSelected.filter((img) => img.id !== imageObject.id);
      } else {
        return [...prevSelected, imageObject];
      }
    });
  };

  if (!folder) return <Typography>Folder not found</Typography>;

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h6" gutterBottom>
        {folder.folderName}
      </Typography>

      <Box className={classes.buttonsWrapper}>
        <Button variant="outlined" onClick={() => navigate("/app/home")}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setPrintModalOpen(true)}
          disabled={selectedImages.length === 0}
        >
          Print
        </Button>
      </Box>

      <Grid container spacing={2}>
        {folder.images.map((imageObj) => {
          const fullPath = `/mock-images/${imageObj.filename}`;
          const isChecked = selectedImages.some(
            (selImg) => selImg.id === imageObj.id
          );

          return (
            <Grid item key={imageObj.id}>
              <Box className={classes.imageBox}>
                <Checkbox
                  checked={isChecked}
                  onChange={() => handleSelect(imageObj)}
                  className={classes.checkbox}
                />
                <img
                  key={imageObj.id}
                  src={fullPath}
                  alt={imageObj.filename}
                  onClick={() => handleImageClickForOverlay(imageObj)}
                  style={{ cursor: "pointer", width: 150, margin: 8 }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={printModalOpen} onClose={() => setPrintModalOpen(false)}>
        <Box className={classes.modal}>
          <Typography variant="h6">Print Preview</Typography>
          {selectedImages.length === 0 ? (
            <Typography>No images selected</Typography>
          ) : (
            <Grid container spacing={2} className={classes.previewGrid}>
              {selectedImages.map((selectedImgObj) => (
                <Grid item key={selectedImgObj.id}>
                  <img
                    src={`/mock-images/${selectedImgObj.filename}`}
                    alt={selectedImgObj.filename}
                    className={classes.previewImage}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>

      <ImageOverlay
        open={Boolean(selectedImageForOverlay)}
        imageObj={selectedImageForOverlay}
        onClose={handleCloseOverlay}
        onToggleSelect={handleSelect}
        isSelected={
          selectedImageForOverlay &&
          selectedImages.some((img) => img.id === selectedImageForOverlay.id)
        }
      />
    </Box>
  );
};

export default FolderPage;

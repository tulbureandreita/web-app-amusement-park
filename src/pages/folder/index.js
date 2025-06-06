import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  Modal,
  Tooltip,
  IconButton,
} from "@mui/material";
import { allFoldersData } from "../../mock/imageData";
import ImageOverlay from "../../components/imageOverlay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useStyles from "./styles";

const FolderPage = () => {
  const classes = useStyles();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const folder = allFoldersData.find((f) => f.folderId === folderId);

  const [selectedImages, setSelectedImages] = useState([]);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleImageClickForOverlay = (imageObj) => {
    const index = folder.images.findIndex((img) => img.id === imageObj.id);
    setSelectedImageIndex(index);
  };

  const handleCloseOverlay = () => {
    setSelectedImageIndex(null);
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
      <Box
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5">{folder.folderId}</Typography>
        <Tooltip title="Copy ID">
          <IconButton size="small" onClick={() => handleCopy(folder.folderId)}>
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className={classes.buttonsWrapper}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
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
      <Box className={classes.gridWrapper}>
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
                    style={{
                      cursor: "pointer",
                      width: 350,
                      margin: 8,
                      outline: isChecked && "3px solid #1976d2",
                      borderRadius: 4,
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Modal open={printModalOpen} onClose={() => setPrintModalOpen(false)}>
        <Box className={classes.modal}>
          <Box className={classes.buttonsWrapper}>
            <Typography variant="h6">
              Images selected: {selectedImages.length}
            </Typography>
            <Button
              variant="contained"
              onClick={() => console.log("PRINT", selectedImages)}
              disabled={selectedImages.length === 0}
            >
              Print
            </Button>
          </Box>
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
        open={selectedImageIndex !== null}
        imageObj={folder.images[selectedImageIndex]}
        onClose={handleCloseOverlay}
        onToggleSelect={handleSelect}
        isSelected={
          selectedImageIndex !== null &&
          selectedImages.some(
            (img) => img.id === folder.images[selectedImageIndex].id
          )
        }
        goNext={() =>
          setSelectedImageIndex((prev) =>
            Math.min(prev + 1, folder.images.length - 1)
          )
        }
        goPrev={() => setSelectedImageIndex((prev) => Math.max(prev - 1, 0))}
        hasNext={selectedImageIndex < folder.images.length - 1}
        hasPrev={selectedImageIndex > 0}
      />
    </Box>
  );
};

export default FolderPage;

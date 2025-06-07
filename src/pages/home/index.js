import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip, Grid } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { matchedFoldersData } from "../../mock/imageData";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h5" gutterBottom>
        {t("homeTitle")}
      </Typography>
      {matchedFoldersData.length > 0 ? (
        <Grid container spacing={3}>
          {matchedFoldersData.map((folder) => (
            <Grid key={folder.folderId}>
              <Box className={classes.folderCard}>
                <IconButton
                  className={classes.folderIconButton}
                  onClick={() => navigate(`/app/${folder.folderId}`)}
                >
                  <FolderIcon className={classes.folderIcon} />
                </IconButton>
                <Box className={classes.folderFooter}>
                  <Typography variant="body2">{folder.folderId}</Typography>
                  <Tooltip title="Copy ID">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(folder.folderId)}
                    >
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textPrimary" sx={{ mt: 4 }}>
          {t("homeEmptyData")}
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;

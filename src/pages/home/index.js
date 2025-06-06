import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip, Grid } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { matchedFoldersData } from "../../mock/imageData";
import useStyles from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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
        Matching Folders
      </Typography>

      {matchedFoldersData.length > 0 ? (
        <Grid container spacing={3}>
          {matchedFoldersData.map((folder) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={folder.folderId}>
              <Box className={classes.folderCard}>
                <IconButton
                  className={classes.folderIconButton}
                  onClick={() => navigate(`/app/${folder.folderId}`)}
                >
                  <FolderIcon className={classes.folderIcon} />
                </IconButton>
                <Box className={classes.folderFooter}>
                  <Typography variant="body2" noWrap>
                    {folder.folderId}
                  </Typography>
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
        <>Please take a picture to see matching folders</>
      )}
    </Box>
  );
};

export default HomePage;

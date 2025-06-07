import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { allFoldersData } from "../../mock/imageData";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const [filteredFolders, setFilteredFolders] = useState(allFoldersData);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      setFilteredFolders(allFoldersData);
    } else {
      const result = allFoldersData.filter(
        (folder) => folder.folderId === trimmed
      );
      setFilteredFolders(result);
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setFilteredFolders(allFoldersData);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h5" gutterBottom>
        {t("searchTitle")}
      </Typography>
      <Box className={classes.searchContainer}>
        <TextField
          label={t("searchFieldLabel")}
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className={classes.searchInput}
        />
        <Button variant="contained" onClick={handleSearch}>
          {t("searchFieldButton")}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          {t("searchFieldReset")}
        </Button>
      </Box>
      {filteredFolders.length > 0 ? (
        <Grid container spacing={3}>
          {filteredFolders.map((folder) => (
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
                  <Tooltip title={t("copyIdTooltip")}>
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
          {t("searchEmptyData")}
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;

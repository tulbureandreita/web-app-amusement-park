import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import mockImageData from "../../mock/imageData";
import useStyles from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h5" gutterBottom>
        Folders
      </Typography>
      {mockImageData.map((folder) => (
        <Box
          key={folder.id}
          className={classes.folderItem}
          onClick={() => navigate(`/app/home/${folder.id}`)}
        >
          {folder.folderName}
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;

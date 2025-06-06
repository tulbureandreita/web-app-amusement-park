import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useStyles from "./styles";

function NavigationContent() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Logo
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/home"
            selected={
              location.pathname === "/app/home" || location.pathname === "/app"
            }
          >
            <ListItemIcon style={{ marginRight: -20 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/search"
            selected={location.pathname === "/app/search"}
          >
            <ListItemIcon style={{ marginRight: -20 }}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 3 }} />
      <Box className={classes.takePicturesContainer}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CameraAltIcon />}
          className={classes.takePicturesButton}
          onClick={() => {
            // TODO: Add functionality here
            navigate("/app/home");
          }}
        >
          Take Picture
        </Button>
      </Box>
    </div>
  );
}

export default NavigationContent;

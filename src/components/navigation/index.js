import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

function NavigationContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search Term:", event.target.value);
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/home"
            selected={
              location.pathname === "/app/home" || location.pathname === "/app"
            }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block", mt: 1, mb: 1, px: 2 }}>
          <Typography
            variant="overline"
            sx={{ display: "block", mb: 0.5, color: "text.secondary" }}
          >
            Search
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                  <SearchIcon fontSize="small" />
                </ListItemIcon>
              ),
            }}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/search"
            selected={location.pathname === "/app/search"}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Page" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}

export default NavigationContent;

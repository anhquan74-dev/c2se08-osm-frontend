import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const AdminHeader = () => {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ height: "100%" }}>
      <Toolbar variant="dense" sx={{ height: "100%" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OSM Management
        </Typography>
        <Button color="inherit">Log out</Button>
      </Toolbar>
    </AppBar>
    // </Box>
  );
};

export default AdminHeader;

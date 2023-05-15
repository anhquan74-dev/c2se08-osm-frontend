import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../modules/Auth/authSlice";

const AdminHeader = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ height: "100%" }}>
      <Toolbar variant="dense" sx={{ height: "100%" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OSM Management
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Log out</Button>
      </Toolbar>
    </AppBar>
    // </Box>
  );
};

export default AdminHeader;

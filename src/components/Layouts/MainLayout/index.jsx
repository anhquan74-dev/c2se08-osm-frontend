import { Box } from "@mui/material";
import React, { Children } from "react";
import { Footer, Header } from "../components";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Box sx={header}>
        <Header />
      </Box>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

const header = {
  color: "green",
};
export default MainLayout;

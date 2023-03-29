import React, { Children } from "react";
import { Footer, Header } from "../components";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;

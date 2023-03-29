import React from "react";
import { Footer, Header } from "../components";

const ProviderLayout = ({ children }) => {
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

export default ProviderLayout;

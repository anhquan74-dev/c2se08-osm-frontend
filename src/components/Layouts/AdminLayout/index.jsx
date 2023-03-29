import React from "react";
import AdminHeader from "../components/AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div>
        <div>Sidebar</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RoleAuthRoute } from "./components/RoleAuthRoute";
import Admin from "./modules/Admin";
import { LoginPage, Register } from "./modules/Auth";
import Counter from "./modules/counter/Counter";
import ServiceProvider from "./modules/ServiceProvider";
import { AdminLayout, MainLayout, ProviderLayout } from "./components/Layouts";
import Customer from "./modules/Customer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Customer />
            </MainLayout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            // <RoleAuthRoute role="admin">
            <AdminLayout>
              <Admin />
            </AdminLayout>
            // </RoleAuthRoute>
          }
        />
        <Route
          path="/service-provider"
          element={
            // <RoleAuthRoute role="provider">
            <ProviderLayout>
              <ServiceProvider />
            </ProviderLayout>
            // </RoleAuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

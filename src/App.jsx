import { Route, Routes } from 'react-router-dom';
import { AdminLayout, MainLayout, ProviderLayout } from './components/Layouts';
import Admin from './modules/Admin';
import { LoginPage, Register } from './modules/Auth';
import Customer from './modules/Customer';
import ServiceProvider from './modules/ServiceProvider';

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <MainLayout>
            <Customer />
          </MainLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin/*"
        element={
          // <RoleAuthRoute role="admin">
          <AdminLayout>
            <Admin />
          </AdminLayout>
          // </RoleAuthRoute>
        }
      />

      <Route
        path="/service-provider/*"
        element={
          // <RoleAuthRoute role="provider">
          <ProviderLayout>
            <ServiceProvider />
          </ProviderLayout>
          // </RoleAuthRoute>
        }
      />
    </Routes>
  );
}

export default App;

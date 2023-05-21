import { Route, Routes } from 'react-router-dom';
import { AdminLayout, MainLayout, ProviderLayout, ProviderLayoutForChat } from './components/Layouts';
import Admin from './modules/Admin';
import { LoginPage, RegisterPage } from './modules/Auth';
import Customer from './modules/Customer';
import ServiceProvider from './modules/ServiceProvider';
import RoleAuthRoute from './components/RoleAuthRoute';
import { NotFound } from './components/Common';
import Chat from './modules/ServiceProvider/Chat';
import Test from './modules/Test';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/*"
        element={
          <RoleAuthRoute role="customer">
            <MainLayout>
              <Customer />
            </MainLayout>
          </RoleAuthRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <RoleAuthRoute role="admin">
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </RoleAuthRoute>
        }
      />
      <Route
        path="/provider/*"
        element={
          <RoleAuthRoute role="provider">
            <ProviderLayout>
              <ServiceProvider />
            </ProviderLayout>
          </RoleAuthRoute>
        }
      />
      <Route
        path="/provider-chat"
        element={
          <RoleAuthRoute role="provider">
            <ProviderLayoutForChat>
              <Chat />
            </ProviderLayoutForChat>
          </RoleAuthRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

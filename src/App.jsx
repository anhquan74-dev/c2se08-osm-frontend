import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RoleAuthRoute } from "./components/RoleAuthRoute";
import Admin from "./modules/Admin";
import { LoginPage, Register } from "./modules/Auth";
import Counter from "./modules/counter/Counter";

function App() {
  return (
    <div className="App">
      <Counter />
      <TestApi />
      <Routes>
        <Route path="" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <RoleAuthRoute role="admin">
              <Admin />
            </RoleAuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

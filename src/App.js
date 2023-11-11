import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import AuthenticateRoute from "./AuthenticateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import FilePage from "./pages/FilePage";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import ModulesPage from "./pages/ModulesPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <AuthenticateRoute>
                {/* <Dashboard /> */}
                <AdminDashboard />
              </AuthenticateRoute>
            }
          />
          <Route path="/Files" element={<FilePage />}></Route>
          <Route path="/Users" element={<UsersPage />}></Route>
          <Route path="/Roles" element={<RolesPage />}></Route>
          <Route path="/Modules" element={<ModulesPage />}></Route>
          <Route path="/Categories" element={<CategoriesPage />}></Route>
          <Route
            path="/change-password"
            element={
              <AuthenticateRoute>
                <ChangePassword />
              </AuthenticateRoute>
            }
          />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

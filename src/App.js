import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseLayout from "./components/newComponents/BaseLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AuthenticateRoute from "./AuthenticateRoute";
import DashboardHome from "./components/DashboardHome";
import FilePage from "./pages/FilePage";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import ModulesPage from "./pages/ModulesPage";
import CategoriesPage from "./pages/CategoriesPage";
import DynamicEditableTable from "./pages/DynamicEditableTable";
import FileHistoryPage from "./pages/FileHistoryPage";
import FileHistoryDetailPage from "./pages/FileHistoryDetailPage";

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
                <BaseLayout componentToRender={DashboardHome} />
              </AuthenticateRoute>
            }
          />
          <Route
            path="/Files"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={FilePage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/FileDetails/:id"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={DynamicEditableTable} />
              </AuthenticateRoute>
            }
          />
          <Route
            path="/FilesHistory"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={FileHistoryPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/FileHistoryDetail/:id"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={FileHistoryDetailPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/Users"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={UsersPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/Roles"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={RolesPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/Modules"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={ModulesPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/Categories"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={CategoriesPage} />
              </AuthenticateRoute>
            }
          ></Route>
          <Route
            path="/ChangePassword"
            element={
              <AuthenticateRoute>
                <BaseLayout componentToRender={ChangePassword} />
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

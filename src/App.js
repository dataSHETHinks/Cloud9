import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AuthenticateRoute from "./AuthenticateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import FilePage from "./pages/FilePage";
import UserRole from "./pages/UserRole";

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
          <Route path="/Files" element={
            <AuthenticateRoute>
              <FilePage />
            </AuthenticateRoute>
          }></Route>
          <Route path="/roles" element={
            <AuthenticateRoute>
              <UserRole />
            </AuthenticateRoute>
          }></Route>
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

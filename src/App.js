import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ChangePassword from './pages/ChangePassword';
import AuthenticateRoute from './AuthenticateRoute';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<AuthenticateRoute><Dashboard /></AuthenticateRoute>} />
          <Route path="/create-user" element={<CreateUser/>} />
          <Route path="/change-password" element={<AuthenticateRoute><ChangePassword /></AuthenticateRoute>} />
          <Route path='*' element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

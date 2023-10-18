import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

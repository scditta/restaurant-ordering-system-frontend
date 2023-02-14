import { Routes, Route } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import NavBar from './components/NavBar';
import OrderHistory from './components/OrderHistory';
import { AuthProvider } from './context/AuthenticationContext';

function App() {
  return (
    <>
      <AuthProvider>
        {/* NavBar Component */}
        <NavBar />
        {/* <DashBoard /> */}
        {/* Routes */}
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" />
          <Route path="/orderHistory" element={<OrderHistory />} />
          {/* <Route path="*" element={<div>page not found!</div>} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

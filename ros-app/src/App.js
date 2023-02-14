import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import NavBar from './components/NavBar';
import OrderHistory from './components/OrderHistory';

import AuthenticationContext from './context/AuthenticationContext';

function App() {
  const authUser = useContext(AuthenticationContext);

  const ProtectedRoute = ({ user, children }) => {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      {/* NavBar Component */}
      <NavBar />
      {/* <DashBoard /> */}
      {/* Routes */}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" />
        <Route
          path="/orderHistory"
          element={
            <ProtectedRoute user={!authUser.auth}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

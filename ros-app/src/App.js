import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import OrderPage from './components/OrderPage';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthenticationContext';
import { MenuProvider } from '../src/context/MenuContext';
import DashBoard from './components/DashBoard';
import OrderHistory from './components/OrderHistory';

import AuthenticationContext from './context/AuthenticationContext';

function App() {
  const authUser = useContext(AuthenticationContext);

  const ProtectedRoute = ({ userAuthorization, children }) => {
    if (userAuthorization) {
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
            <ProtectedRoute userAuthorization={!authUser.authorization}>
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

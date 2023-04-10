import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import OrderPage from './components/OrderPage';
import CouponPage from './components/CouponPage';
import NavBar from './components/NavBar';
import DashBoard from './components/DashBoard';
import OrderHistory from './components/OrderHistory';
import AuthenticationContext from './context/AuthenticationContext';
import ChangeCoupon from './components/CouponComponents/ChangeCoupon';
import YourOrders from './components/YourOrders';

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
        <Route
          path="/ordergrid"
          element={
            <ProtectedRoute userAuthorization={!authUser.authorization}>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderHistory"
          element={
            <ProtectedRoute userAuthorization={!authUser.authorization}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/orders" element={<YourOrders />} />

        <Route
          path="/couponManagement"
          element={
            <ProtectedRoute userAuthorization={!authUser.authorization}>
              <CouponPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changeCoupon"
          element={
            <ProtectedRoute userAuthorization={!authUser.authorization}>
              <ChangeCoupon />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

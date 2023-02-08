import { Routes, Route } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import OrderPage from './components/OrderPage';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthenticationContext';
import { MenuProvider } from '../src/context/MenuContext';

function App() {
  return (
    <>
      <AuthProvider>
        {/* Routes */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ordergrid" element={<OrderPage />} />
          {/* <Route path="*" element={<div>page not found!</div>} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

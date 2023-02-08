import { Routes, Route } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import OrderGrid from './components/OrderGrid';
import Menu from './components/Menu';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthenticationContext';
import { OrderGridProvider } from '../src/context/OrderGridContext';
import { MenuProvider } from '../src/context/MenuContext';
function App() {
  return (
    <>
      <AuthProvider>
        {/* Routes */}
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <MenuProvider>
                <Menu />
              </MenuProvider>
            }
          />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/ordergrid"
            element={
              <OrderGridProvider>
                <OrderGrid />
              </OrderGridProvider>
            }
          />
          {/* <Route path="*" element={<div>page not found!</div>} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

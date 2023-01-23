import { Routes, Route } from 'react-router-dom';

import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import { AuthProvider } from './context/AuthenticationContext';

function App() {
  return (
    <>
      <AuthProvider>
        <DashBoard />
        {/* Routes */}
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<div>page not found!</div>} /> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

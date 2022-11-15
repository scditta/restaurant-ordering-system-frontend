// import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './CreateUser.css'; // added styles: rezi
import CreateUser from './components/CreateUser';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <div>
        <Link to="/">Main</Link> |<Link to="/signup">Sign Up</Link>
      </div>
      {/* -------------- */}
      <Routes>
        <Route path="/" element={<div>Home!</div>} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;

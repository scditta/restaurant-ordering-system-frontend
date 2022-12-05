import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      {/* Content */}
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          <Col></Col>
          <Col xs={6}>
            <Card className="h-100"></Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>

      {/* -------------- */}
      <Routes>
        <Route path="/" />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>page not found!</div>} />
      </Routes>
    </>
  );
}

export default App;

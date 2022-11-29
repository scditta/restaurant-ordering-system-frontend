// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown, Row, Col, Card } from 'react-bootstrap';
import './App.css';

import CreateUser from './components/CreateUser';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ROS-APP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link>Menu</Nav.Link>
              <Nav.Link>Orders</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              Signed in as: <a href="#login">Stephen Ditta</a>
            </Navbar.Text> */}
            <NavDropdown title="Guest">
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavDropdown.Item>Sign up</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>
            <Card></Card>
          </Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>

      {/* -------------- */}
      <Routes>
        <Route path="/" element={<div>Home!</div>} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<div>page not found!</div>} />
      </Routes>
    </>
  );
}

export default App;

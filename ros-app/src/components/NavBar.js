import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import api from '../API/posts';

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userSessionToken = localStorage.getItem('user_session_token');
      console.log(userSessionToken);
      if (userSessionToken === null) {
        setUser(null);
        return;
      }
      // setUser(userSessionToken);
      try {
        const userID = localStorage.getItem('user_id');
        const response = await api.get(`/api/v1/users/${userID}`);
        // console.log(response);
        if (response.data.session_token === userSessionToken) {
          setUser(response.data);
        }
        // console.log(user);
      } catch (err) {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchUser();
  }, []);

  async function logoutUser() {
    const userID = localStorage.getItem('user_id');
    try {
      const response = await api.post(`/api/v1/logout/${userID}`);
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        //not in the 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        //response is undefined
        console.log(`Error: ${err.message}`);
      }
    }
    localStorage.removeItem('user_session_token');
    localStorage.removeItem('user_id');
    window.location.reload();
    // this.forceUpdate();
    // navigate(0);
  }

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
            <NavDropdown title={user == null ? 'Guest' : user.displayname}>
              {user == null ? (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavDropdown.Item>Sign up</NavDropdown.Item>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

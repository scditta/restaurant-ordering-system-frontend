import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import AuthenticationContext from '../AuthenticationContext';

import { logout } from '../API/authenticationService';

// import api from '../API/posts';

export default function NavBar() {
  const authUser = useContext(AuthenticationContext);
  // console.log(authUser);
  // loggedInUser.setAuth(true);
  // console.log(loggedInUser);
  // const [user, setUser] = useState(null);

  // const [loggedIn, setLogin] = useState(false);

  // console.log(user);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userSessionToken = localStorage.getItem('user_session_token');
  //     console.log(userSessionToken);
  //     if (userSessionToken === null) {
  //       setUser(null);
  //       return;
  //     }
  //     // setUser(userSessionToken);
  //     try {
  //       const userID = localStorage.getItem('user_id');
  //       const response = await api.get(`/api/v1/users/${userID}`);
  //       // console.log(response);
  //       if (response.data.session_token === userSessionToken) {
  //         setUser(response.data);
  //       }
  //       // console.log(user);
  //     } catch (err) {
  //       if (err.response) {
  //         //not in the 200 range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         //response is undefined
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   console.log('updated -> ', user);
  // }, [user]);

  async function logoutUser() {
    logout()
      .then((resp) => {
        console.log(resp);
        //removes the user data as they are logged out and not stored locally
        authUser.userLogged();
      })
      .catch((err) => {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      });
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
            <NavDropdown title={!authUser.auth ? 'Guest' : authUser.user.displayname}>
              {!authUser.auth ? (
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

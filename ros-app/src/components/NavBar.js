import { useContext, useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import { logout } from '../API/authenticationService';
import AuthenticationContext from '../context/AuthenticationContext';

export default function NavBar() {
  const [orderNotification, setOrderNotification] = useState(false);
  const [orderTrackerNotification, setOrderTrackerNotification] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const authUser = useContext(AuthenticationContext);

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

  function showNotification(text) {
    setOrderNotification(true);
    setToastText(text);
    setShowToast(true);
  }

  useEffect(() => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/sse/orders`;
    url = url.replace(/(?<!:)\/+/gm, '/'); //clean up double slashes in url
    const es = new EventSourcePolyfill(url, {
      headers: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    console.log(`Connected to SSE server.`);

    es.addEventListener('order', (event) => {
      const eventData = JSON.parse(event.data);

      switch (eventData.event) {
        case 'order-create':
          setOrderTrackerNotification(true);
          break;
        case 'order-update':
          if (authUser.user && eventData.user === authUser.user.id) {
            switch (eventData.state) {
              case 'IN_PROGRESS':
                showNotification(`Your order is being prepared by the restaurant.`);
                break;
              case 'COMPLETE':
                showNotification(`Your order is ready for pickup.`);
                break;
              default:
            }
          }
          break;
        default:
      }
    });

    return () => {
      es.close();
    };
  });

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
              <LinkContainer to="/">
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>

              {!authUser.authorization ? (
                <>
                  <LinkContainer to="/orders">
                    <Nav.Link
                      onClick={() => {
                        setOrderNotification(false);
                      }}
                    >
                      Orders
                      {orderNotification ? (
                        <ExclamationCircleFill
                          style={{
                            marginLeft: '0.2em',
                            transform: 'translate(0px, -1px)',
                            color: 'red',
                          }}
                        ></ExclamationCircleFill>
                      ) : (
                        <></>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/ordergrid">
                    <Nav.Link
                      onClick={() => {
                        setOrderTrackerNotification(false);
                      }}
                    >
                      Order Tracker
                      {orderTrackerNotification ? (
                        <ExclamationCircleFill
                          style={{
                            marginLeft: '0.2em',
                            transform: 'translate(0px, -1px)',
                            color: 'red',
                          }}
                        ></ExclamationCircleFill>
                      ) : (
                        <></>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/orderHistory">
                    <Nav.Link>Order History</Nav.Link>
                  </LinkContainer>
                </>
              )}
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
      {authUser.authorization ? (
        <Alert className="m-0 p-1 px-5" key="info" variant="info">
          You are logged in as an admin.
        </Alert>
      ) : (
        <></>
      )}
      <ToastContainer className="p-3 position-fixed" position="top-center">
        <Toast
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Order Update</strong>
          </Toast.Header>
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Modal, Form, Button, Alert } from 'react-bootstrap';

import AuthenticationContext from '../AuthenticationContext';

import { login } from '../API/authenticationService';

// import api from '../API/posts';

export default function Login() {
  const authUser = useContext(AuthenticationContext);

  const [userLoginData, setUserLoginData] = useState({
    //initialize empty login
    email: '',
    password: '',
  });

  const [show, setShow] = useState(true);
  const [errorResponse, setErrorResponse] = useState('');

  let navigate = useNavigate();

  function handleChange(e) {
    //validation of form and form updates
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUserLoginData((prevUserData) => {
      return {
        ...prevUserData,
        [name]: value,
      };
    });
  }

  //Handle the submission of a user logging in
  async function handleSubmit(e) {
    e.preventDefault();

    login(userLoginData.email, userLoginData.password)
      .then((resp) => {
        console.log(resp);
        //adds the user data as they are logged in and stores it locally
        authUser.userLogged();
        //redirect to the dashboard
        navigate('/');
      })
      .catch((err) => {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setErrorResponse(err.response.data.error);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      });
  }

  return (
    <>
      <Container>
        <Modal
          show={show}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {
            setShow(false);
            navigate('/');
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userLoginData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userLoginData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="mb-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              {errorResponse !== '' ? <Alert variant="danger">{errorResponse}</Alert> : <></>}
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

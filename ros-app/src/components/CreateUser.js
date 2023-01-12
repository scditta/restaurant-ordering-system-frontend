import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Form, Button, Alert } from 'react-bootstrap';

import AuthenticationContext from '../AuthenticationContext';

import { signup, login } from '../API/authenticationService';

import api from '../API/posts';

import '../CreateUser.css';

export default function CreateUser() {
  const authUser = useContext(AuthenticationContext);
  console.log(authUser);

  const [userData, setUserData] = useState({
    //initialize empty
    email: '',
    user_type: 0,
    password: '',
    displayname: '',
  });

  // const [userId, setUserId] = useState('');

  const [show, setShow] = useState(true);

  const [errorResponse, setErrorResponse] = useState('');

  let navigate = useNavigate();

  function handleChange(e) {
    //validation of form and form updates
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [name]: value,
      };
    });
  }

  //Handle the submission of a created user
  async function handleSubmit(e) {
    e.preventDefault();

    signup(userData.email, userData.user_type, userData.password, userData.displayname)
      .then((resp) => {
        console.log(resp);
        login(userData.email, userData.password)
          .then((resp) => {
            console.log(resp);
            authUser.userLogged();
          })
          .catch((err) => {
            console.log(err);
          });

        //redirect to the home page
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

    // try {
    //   const response = await api.post('/api/v1/users', userData);
    //   console.log(response.data);
    //   // setUserId(response.data.id);
    //   setErrorResponse('');

    //   //redirect to the home page
    //   navigate('/');
    // } catch (err) {
    //   if (err.response) {
    //     //not in the 200 range
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //     setErrorResponse(err.response.data.error);
    //   } else {
    //     //response is undefined
    //     console.log(`Error: ${err.message}`);
    //   }
    // }
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
            <Modal.Title id="contained-modal-title-vcenter">Create Account</Modal.Title>
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
                    value={userData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="displayname"
                    value={userData.displayname}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
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

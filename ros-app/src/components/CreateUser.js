import { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

import api from '../API/posts';

export default function CreateUser() {
  const [userData, setUserData] = useState({
    //initialize empty
    email: '',
    user_type: 0,
    password_hash: '',
    displayname: '',
  });

  const [errorResponse, setErrorResponse] = useState('');

  // useEffect(() => {

  // }, []);

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

  function handleSubmit(e) {
    //for the submission of a successful creation
    // console.log(e);

    e.preventDefault();

    api
      .post('/api/v1/users', userData)
      .then((response) => {
        console.log(response);
        setErrorResponse('');
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorResponse(error.response.data.error);
      });

    console.log(userData);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicDisplayName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            name="displayname"
            value={userData.displayname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password_hash"
            value={userData.password_hash}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {errorResponse !== '' ? <Alert variant="danger">{errorResponse}</Alert> : <></>}
    </>
  );
}

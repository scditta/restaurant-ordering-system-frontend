import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Button, Form, Alert } from 'react-bootstrap';

import api from '../API/posts';

=======
import api from '../API/posts';


>>>>>>> 814da9188b296bbbc4f82ab15bea71c2e7eda680
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
<<<<<<< HEAD
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
=======
      <section>
        <h1>Create Account</h1>
        <hr></hr>
      <form onSubmit={handleSubmit}>
          <label>Username </label>
          <input 
            type="text"
            id="username"
            placeholder="Username"
            name="displayname"
            required
            value={userData.displayname}
            onChange={handleChange}
          />
          <br></br>

          <label>Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Id"
            name="email"
            required
            value={userData.email}
            onChange={handleChange}
          />
          <br></br>
       
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            name="password_hash"
            required
            value={userData.password_hash}
            onChange={handleChange}
          />
          <br></br>

          <label>Confirm Password</label>
          <input
            type="password"
            id="confirm_pwd"
            placeholder="Confirm Password"
            name="password_hash"
            required
            value={userData.password_hash}
            onChange={handleChange}
          />
          <br></br><br></br>


        <button variant="primary" type="submit" id="button">
          Register
        </button>
      </form>

      <p>Already registered?
      <span>
        <a href="#"> Log In</a>
      </span>
      </p>

      </section>


      {errorResponse !== '' ? <alert variant="danger">{errorResponse}</alert> : <></>}
>>>>>>> 814da9188b296bbbc4f82ab15bea71c2e7eda680
    </>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Form, Alert } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import api from '../API/posts';

export default function CreateUser() {
  const [userData, setUserData] = useState({
    //initialize empty
    email: '',
    user_type: 0,
    password_hash: '',
    displayname: '',
  });

  // const [userId, setUserId] = useState('');

  const [errorResponse, setErrorResponse] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    console.log('page load');
  }, []);

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

    try {
      const response = await api.post('/api/v1/users', userData);
      console.log(response.data);
      // setUserId(response.data.id);
      setErrorResponse('');
      navigate('/welcome', {
        state: {
          id: response.data.id,
        },
      });
      // navigate({
      //   pathname: '/welcome',
      //   state: response.data.id,
      // });
      // history.go('/welcome');
    } catch (err) {
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
    }

    // api
    //   .post('/api/v1/users', userData)
    //   .then((response) => {
    //     console.log(response);
    //     setErrorResponse('');
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.error);
    //     setErrorResponse(error.response.data.error);
    //   });

    // console.log(userData);
  }

  return (
    <>
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
            // required
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
            // required
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
            // required
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
            // required
            value={userData.password_hash}
            onChange={handleChange}
          />
          <br></br>
          <br></br>

          <button variant="primary" type="submit" id="button">
            Register
          </button>
        </form>
        <p>
          Already registered?
          <span>
            <a href="/#">Log In</a>
          </span>
        </p>
        {errorResponse !== '' ? <Alert variant="danger">{errorResponse}</Alert> : <></>}
      </section>
    </>
  );
}

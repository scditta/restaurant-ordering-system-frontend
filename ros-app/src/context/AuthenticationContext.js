import { createContext, useState, useEffect } from 'react';
import api from '../API/posts';

//React Context
const AuthenticationContext = createContext();

export function AuthProvider({ children }) {
  //authentication / logged in
  const [auth, setAuth] = useState(false);
  //if the user has administrative privileges
  const [authorization, setAuthorization] = useState(false);
  //user data if successfully logged
  const [user, setUser] = useState(null);

  useEffect(() => {
    userLogged();
  }, []);

  //checks if the user is logged in the system or not
  const userLogged = () => {
    const fetchUser = async () => {
      const userSessionToken = localStorage.getItem('user_session_token');
      // console.log(userSessionToken);
      //if there is no local session token the user is not logged in
      if (userSessionToken === null) {
        setUser(null);
        setAuth(false);
        setAuthorization(false);
        return;
      }

      try {
        const userID = localStorage.getItem('user_id');
        const response = await api.get(`api/v1/users/${userID}`);
        //if there is a user session token
        if (response.data.session_token === userSessionToken) {
          setUser(response.data);
          setAuth(true);
          //if the logged in user is an authorized
          if (response.data.user_type >= 2) {
            setAuthorization(true);
          }
        } else {
          //if there is no user session token remove the localstorage
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_session_token');
        }
        // console.log(user);
      } catch (err) {
        if (err.response) {
          setUser(null);
          setAuth(false);
          setAuthorization(false);
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
  };

  return (
    <AuthenticationContext.Provider value={{ auth, setAuth, user, userLogged, authorization }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;

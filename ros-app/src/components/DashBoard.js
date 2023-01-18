import { useEffect } from 'react';
// import { Container, Row, Col, Image } from 'react-bootstrap';

import NavBar from './NavBar';
import Menu from './Menu';

// import api from '../API/posts';

export default function DashBoard() {
  // const [menuItems, setMenuItems] = useState([]);

  // const [loggedIn, setLoggedIn] = useState({
  //   loginStatus: false,
  //   user: {},
  // });

  // let isLocalLogged = localStorage.getItem('user_session_token') !== null;
  // if (isLocalLogged) {
  //   console.log('yup');
  // }

  // console.log(localStorage.getItem('user_session_token') !== null);

  // let login = false;

  useEffect(() => {
    // setLoggedIn(isLocalLogged);
    // console.log(loggedIn);
    //Render Menu Items
    // const fetchMenu = async () => {
    //   try {
    //     const response = await api.get('/api/v1/menuItems');
    //     // console.log(response.data);
    //     setMenuItems(response.data);
    //   } catch (err) {
    //     if (err.response) {
    //       //not in the 200 range
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //       console.log(err.response.headers);
    //     } else {
    //       //response is undefined
    //       console.log(`Error: ${err.message}`);
    //     }
    //   }
    // };
    // fetchMenu();
    // if (loggedIn === false) {
    //   console.log('Not Loggedin');
    // } else {
    //   console.log('Loggedin');
    // }
    // console.log(menuItems);
  }, []);

  // if (!login) {
  //   setLoggedIn(localStorage.getItem('user_session_token') !== null);
  //   login = true;
  // }

  return (
    <>
      {/* NavBar Component */}
      <NavBar />
      {/* Content */}
      <Menu />
    </>
  );
}

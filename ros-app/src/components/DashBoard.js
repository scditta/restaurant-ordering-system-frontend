import { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import NavBar from './NavBar';

import api from '../API/posts';

export default function DashBoard() {
  const [menuItems, setMenuItems] = useState([]);

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
    const fetchMenu = async () => {
      try {
        const response = await api.get('/api/v1/menuItems');
        // console.log(response.data);
        setMenuItems(response.data);
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

    fetchMenu();

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
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          <Col></Col>
          <Col xs={6} className="h-100 overflow-auto">
            <Container>
              {menuItems?.map((category, index) => (
                <div key={index}>
                  <Row className="mb-3 mt-4">
                    <Col>
                      <h1>{category.categoryName}</h1>
                    </Col>
                  </Row>

                  {category.items.map((item, index) => (
                    <Row key={index} className="mb-3">
                      <Col>
                        <Image className="cardImage" src={item.image}></Image>
                      </Col>
                      <Col>
                        <Row>
                          <h6>{item.name}</h6>
                        </Row>
                        <Row>{item.description}</Row>
                      </Col>
                      <Col>${item.price}</Col>
                    </Row>
                  ))}
                </div>
              ))}
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './App.css';

import CreateUser from './components/CreateUser';
import Login from './components/Login';
import NavBar from './components/NavBar';

import api from './API/posts';

function App() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
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
    // console.log(menuItems);
  }, []);

  return (
    <>
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

      {/* -------------- */}
      <Routes>
        <Route path="/" />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>page not found!</div>} />
      </Routes>
    </>
  );
}

export default App;

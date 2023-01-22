import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Item from './Item';
import Category from './Category';

import api from '../API/posts';

export default function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/v1/categories');
        // console.log(response.data);
        setCategories(response.data);
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
    fetchCategories();
  }, []);

  return (
    <>
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          {/* <Col></Col> */}
          <Col xs={6} className="h-100 overflow-auto">
            <Container>
              {categories.map((category, index) => (
                <div key={index}>
                  <Category categoryId={category.id} categoryName={category.name} />

                  {category?.items.map((item, index) => (
                    // console.log(item);
                    <Item key={index} itemId={item} categoryId={category.id} />
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

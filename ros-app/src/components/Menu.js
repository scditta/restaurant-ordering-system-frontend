import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Item from './Item';
import Category from './Category';
import AuthenticationContext from '../context/AuthenticationContext';
import AddCategoryButton from './AddCategoryButton';
import AddItemButton from './AddItemButton';
import Cart from './Cart';

import MenuContext from '../context/MenuContext';

export default function Menu() {
  const menuData = useContext(MenuContext);
  const authUser = useContext(AuthenticationContext);

  return (
    <Container>
      <Row className="pt-3">
        <Col md={8}>
          <AddCategoryButton />
          {menuData.categories?.map((category, index) => (
            <div key={index}>
              <Category categoryId={category.id} categoryName={category.name} />
              {category?.items.map((item, index) => (
                <Item key={index} itemId={item} categoryId={category.id} />
              ))}
              {authUser.authorization && <AddItemButton categoryId={category.id} />}
            </div>
          ))}
        </Col>
        <Col md={4} className="ml-4">
          <Cart />
        </Col>
      </Row>
    </Container>
  );
}

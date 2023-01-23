import { useContext } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';

import Item from './Item';
import Category from './Category';
import AddCategoryButton from './AddCategoryButton';
import AddItemButton from './AddItemButton';

import MenuContext from '../context/MenuContext';

export default function Menu() {
  const menuData = useContext(MenuContext);

  return (
    <>
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          <Col className="h-100 overflow-auto">
            <Container>
              <Container>
                <Stack gap={3} className="col-md-5 mx-2 my-3 ">
                  <AddCategoryButton />
                </Stack>
              </Container>
              {menuData?.categories.map((category, index) => (
                <div key={index}>
                  <Category categoryId={category.id} categoryName={category.name} />

                  {category?.items.map((item, index) => (
                    // console.log(item);
                    <Item key={index} itemId={item} categoryId={category.id} />
                  ))}
                  <AddItemButton />
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

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Item from './Item';

import api from '../API/posts';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  // const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/v1/categories');
        // console.log(response.data);
        setCategories(response.data);

        // for (let i = 0; i < response.data.length; i++) {
        //   console.log(response.data[i].items);

        // getAllItems()
        //   .then((resp) => {
        //     // console.log(resp);
        //     setMenuItems(resp); //store the items into the menuItems state
        //   })
        //   .catch((err) => {
        //     if (err.response) {
        //       //not in the 200 range
        //       console.log(err.response.data);
        //       console.log(err.response.status);
        //       console.log(err.response.headers);
        //     } else {
        //       //response is undefined
        //       console.log(`Error: ${err.message}`);
        //     }
        //   });

        // getItems(response.data[i].id)
        //   .then((resp) => {
        //     // console.log(...menuItems, ...resp);
        //     // setMenuItems(...menuItems, ...resp);
        //     // console.log(...resp);
        //     setMenuItems(resp, ...resp);
        //   })
        //   .catch((err) => {
        //     if (err.response) {
        //       //not in the 200 range
        //       console.log(err.response.data);
        //       console.log(err.response.status);
        //       console.log(err.response.headers);
        //     } else {
        //       //response is undefined
        //       console.log(`Error: ${err.message}`);
        //     }
        //   });
        // }
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

  // async function getAllItems() {
  //   // const response = await api.get(`/api/v1/categories/${itemId}`);
  //   const response = await api.get('/api/v1/items');
  //   return response.data;
  // }

  // const GetCategoryItems = async ({ categoryId }) => {
  //   // console.log(categoryId);
  //   const response = await api.get(`/api/v1/categories/${categoryId}`);
  //   console.log(response.data);

  //   // return response.data.map((item, index) => (
  //   //   <div key={index} alt={item.id}>
  //   //     <Row className="mb-3">
  //   //       <Col>
  //   //         <Image className="cardImage" src={item.image}></Image>
  //   //       </Col>
  //   //       <Col>
  //   //         <Row>
  //   //           <h6>{item.name}</h6>
  //   //         </Row>
  //   //         <Row>{item.description}</Row>
  //   //       </Col>
  //   //       <Col>${item.price}</Col>
  //   //     </Row>
  //   //   </div>
  //   // ));
  //   return response.data;
  // };

  return (
    <>
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          {/* <Col></Col> */}
          <Col xs={6} className="h-100 overflow-auto">
            <Container>
              {categories.map((category, index) => (
                <div key={index}>
                  <Row alt={category.id} className="mb-3 mt-4">
                    <Col>
                      <h1>{category.name}</h1>
                    </Col>
                  </Row>

                  {category?.items.map((item, index) => (
                    // console.log(item);
                    <Item key={index} itemId={item} />
                  ))}

                  {/* {getCategoryItems(category.id).map((categoryItems, index) => {
                    <div key={index} alt={categoryItems.id}>
                      <Row className="mb-3">
                        <Col>
                          <Image className="cardImage" src={categoryItems.image}></Image>
                        </Col>
                        <Col>
                          <Row>
                            <h6>{categoryItems.name}</h6>
                          </Row>
                          <Row>{categoryItems.description}</Row>
                        </Col>
                        <Col>${categoryItems.price}</Col>
                      </Row>
                    </div>;
                  })} */}

                  {/* {category.items.map((categoryItem, index) =>
                    console.log(category.name, ' ', categoryItem)
                  )} */}

                  {/* {menuItems?.map((item, index) =>
                    category.items.includes(item.id) ? (
                      <div key={index} alt={item.id}>
                        <Row className="mb-3">
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
                      </div>
                    ) : (
                      <></>
                    )
                  )} */}
                  {/* {menuItems?.map((item, index) =>
                    category.items.includes(item.id) ? (
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
                    ) : (
                      <></>
                    )
                  )} */}
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

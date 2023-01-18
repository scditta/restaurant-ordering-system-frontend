import { useState, useEffect } from 'react';
import { Row, Image, Col } from 'react-bootstrap';

import api from '../API/posts';

export default function Item(props) {
  const [item, setItemData] = useState([]);

  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    // console.log(props.itemId);

    //Fetch the item and insert its data
    const fetchItem = async () => {
      try {
        const response = await api.get(`api/v1/items/${props.itemId}`);
        setItemData(response.data);
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
    fetchItem();
  }, [props.itemId]);

  return (
    <>
      <Row alt={item.id} className="mb-3">
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
        {/* If the user logged in is an admin */}
        {isAdmin ? <Row>Woo</Row> : <></>}
      </Row>
    </>
  );
}

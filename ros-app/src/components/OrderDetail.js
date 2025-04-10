import { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';

import api from '../API/posts';
import { currency } from '../helpers/currency';

export default function OrderDetail(props) {
  const [isLoading, setLoading] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    // console.log('itemEffect');
    api
      .get(`api/v1/items/${props.itemId}`)
      .then((resp) => {
        // console.log(resp.data);
        setItem(resp.data);
      })
      .catch((err) => {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      }).finally(()=>{
        setLoading(false);
      });
  }, [props.itemId]);

  return (
    <>
    {isLoading? 
      <Card.Text>Loading</Card.Text> : 
    (
      <>
      <Col>
        <Card.Text>{item.name}</Card.Text>
      </Col>
      <Col>
        <Card.Text>{currency(item.price)}</Card.Text>
      </Col>
      <Col>
        <Card.Text>Quantity: {props.qty}</Card.Text>
      </Col>
      </>
      )}
    </>
  );
}

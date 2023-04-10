import { useState, useContext, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import api from '../API/posts';

import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

import AuthenticationContext from '../context/AuthenticationContext';
// import api from '../API/posts';

export default function Coupon(props) {
  const authUser = useContext(AuthenticationContext);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.itemId]);

  async function handleDelete() {
    console.log('dete');
    try {
      console.log(props);
      const response = await api.delete(`api/v1/coupons/${props.id}`);
      props.updateCouponCallback(response);
      console.log(response);
    } catch {}
  }

  return (
    <>
      {isLoading ? (
        <Row>Loading...</Row>
      ) : (
        <Row alt={props.item} className="mb-3 mt-4" style={{ borderBottom: '1px solid black' }}>
          <Col xs={5}>
            <img src={item.image} alt="error" className="cardImage"></img>
            <p>Item: {item.name}</p>
            <p>Coupon Code: {props.code}</p>
            <p>Discount: {props.discount_percent}%</p>
          </Col>
          <Col>
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete Coupon
            </Button>
          </Col>

          {/* If the user logged in is an admin */}
        </Row>
      )}
    </>
  );
}

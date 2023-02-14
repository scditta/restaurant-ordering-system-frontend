import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col } from 'react-bootstrap';
import OrderButtonGroup from './OrderButtonGroup';

import AuthenticationContext from '../context/AuthenticationContext';
import api from '../API/posts';

export default function Order(props) {
  const [order, setOrderData] = useState([]);
  const authUser = useContext(AuthenticationContext);

  const [show, setShow] = useState(false);

  useEffect(() => {
    updateOrder(props.orderId);
  }, [props.orderId]);

  //Fetch the order item and insert its data
  const updateOrder = async (orderId) => {
    try {
      const response = await api.get(`api/v1/orders/${orderId}`);
      setOrderData(response.data);
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

  function isActiveOrder(state) {
    if (state === 'NOT_STARTED' || state === 'IN_PROGESS') {
      return (
        <>
          <Row alt={order.id} className="mb-3 py-2" style={{ cursor: 'pointer' }}>
            <Col>
              <Row>
                <h6>Order ID: {order.id}</h6>
              </Row>
              <Row>
                <p>Order State: {order.state}</p>
              </Row>
            </Col>
            <Col>
              <OrderButtonGroup
                orderId={order.id}
                orderData={order}
                className="mb-2"
              ></OrderButtonGroup>
            </Col>
          </Row>
        </>
      );
    }
  }

  const handleChange = () => {};

  return <>{isActiveOrder(order.state) ? isActiveOrder(order.state) : ''}</>;
}

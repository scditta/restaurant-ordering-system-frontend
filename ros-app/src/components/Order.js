import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col } from 'react-bootstrap';
import OrderButtonGroup from './OrderButtonGroup';
import api from '../API/posts';
export default function Order(props) {
  function isActiveOrder(isActiveOrder) {
    if (isActiveOrder) {
      return true;
    } else {
      return false;
    }
  }
  const [order, setOrderData] = useState(props.orderData);

  //Fetch the order item and insert its data
  useEffect(() => {
    updateOrder(props.orderId);
  }, [props.orderId]);
  const updateOrder = async (e) => {
    try {
      const getResponse = await api.get(`api/v1/orders/${props.orderId}`);
      setOrderData(getResponse.data);
    } catch (err) {
      if (err.response) {
        //not in the 200 range
        console.log(err.getResponse.data);
        console.log(err.getResponse.status);
        console.log(err.getResponse.headers);
      } else {
        //response is undefined
        console.log(`Error: ${err.message}`);
      }
    }
  };
  console.log(order);
  if (isActiveOrder(props.isOrderActive)) {
    if (order.state === 'NOT_STARTED' || order.state === 'IN_PROGRESS')
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
  } else {
    if (order.state === 'COMPLETE') {
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
                updateOrder={updateOrder(order)}
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
}

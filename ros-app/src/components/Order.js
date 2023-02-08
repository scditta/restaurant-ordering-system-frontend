import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

  const handleClick = () => {
    if (authUser.authorization) {
      setShow(true);
    }
  };

  return (
    <>
      <Row alt={order.id} className="mb-3 py-2" style={{ cursor: 'pointer' }} onClick={handleClick}>
        <Col>
          <Row>
            {console.log('ORDER: ' + order)}
            <h6>Order ID: {order.id}</h6>
          </Row>
          <Row>
            <p>Order State: {order.state}</p>
          </Row>
        </Col>
        <Col>
          <ButtonGroup className="mb-2">
            <Button id="not-started-btn" style={{ backgroundColor: '#ff0000' }}>
              NOT STARTED
            </Button>
            <Button id="in-progress-btn">IN PROGRESS</Button>
            <Button id="completed-btn">COMPLETED</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
}

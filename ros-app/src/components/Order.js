import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col, Container } from 'react-bootstrap';
import OrderButtonGroup from './OrderButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
  const [orderItems, setOrderItems] = useState([]);

  //Fetch the order item and insert its data

  useEffect(() => {
    const fetchItems = async () => {
      let allItems = [];

      for (const item of order.items) {
        const getResponse = await api.get(`api/v1/items/${item.item}`);
        allItems.push({ qty: item.qty, name: getResponse.data.name });
      }

      setOrderItems(allItems);
    };

    fetchItems();
  }, []);

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

  // return (
  //   props.showActiveOrder &&
  //   order.state !== 'COMPLETE' && (
  //     <Col>
  //       <Card alt={order.id} style={{}}>
  //         <Card.Body>
  //           <Card.Title>
  //             <div>{order.pin}</div>
  //           </Card.Title>
  //           {orderItemNames.map((name, index) => (
  //             <Row key={index}>
  //               <Card.Text>{name}</Card.Text>
  //             </Row>
  //           ))}
  //           <OrderButtonGroup
  //             updateOrderCallback={updateOrder}
  //             orderId={order.id}
  //             orderData={order}
  //           ></OrderButtonGroup>
  //         </Card.Body>
  //       </Card>
  //     </Col>
  //   )
  // );

  if (isActiveOrder(props.showActiveOrder)) {
    if (order.state !== 'COMPLETE') {
      return (
        <Col className="col-4">
          <div style={{ margin: '10px', padding: '10px' }}>
            <Card alt={order.id} style={{ height: '300px' }}>
              <Card.Body>
                <Card.Title>
                  <div>Order # {order.pin}</div>
                </Card.Title>
                {orderItems.map((item, index) => (
                  <Row key={index}>
                    <Card.Text>
                      {item.qty}x {item.name}
                    </Card.Text>
                  </Row>
                ))}
                <OrderButtonGroup
                  updateOrderCallback={updateOrder}
                  orderId={order.id}
                  orderData={order}
                ></OrderButtonGroup>
              </Card.Body>
            </Card>
          </div>
        </Col>
      );
    }
  } else {
    let oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;

    if (order.state === 'COMPLETE' && oneDay > order.date) {
      return (
        <Col className="col-4">
          <div style={{ margin: '10px', padding: '10px' }}>
            <Card alt={order.id} style={{ height: '300px' }}>
              <Card.Body>
                <Card.Title>
                  <div>Order # {order.pin}</div>
                </Card.Title>
                {orderItems.map((item, index) => (
                  <Row key={index}>
                    <Card.Text>
                      {item.qty}x {item.name}
                    </Card.Text>
                  </Row>
                ))}
                <OrderButtonGroup
                  updateOrderCallback={updateOrder}
                  orderId={order.id}
                  orderData={order}
                ></OrderButtonGroup>
              </Card.Body>
            </Card>
          </div>
        </Col>
      );
    }
  }
}

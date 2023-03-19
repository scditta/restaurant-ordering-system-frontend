import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';

import api from '../API/posts';
import { currency } from '../helpers/currency';

import OrderDetail from './OrderDetail';

import AuthenticationContext from '../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

export default function YourOrders() {
  const authUser = useContext(AuthenticationContext);

  let navigate = useNavigate();

  // const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notCompleteOrders, setNotCompleteOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(authUser.user.id);
    if (!authUser.auth) {
      console.log('Guest / Not logged in');
      setCompletedOrders([]);
    } else {
      api
        .get(`api/v1/orders?user=${authUser.user.id}&state=${'COMPLETE'}`)
        .then((resp) => {
          // console.log(resp.data);
          setCompletedOrders(resp.data.reverse());
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
      api
        .get(`api/v1/orders?state=${'NOT_STARTED'}&state=${'IN_PROGRESS'}&user=${authUser.user.id}`)
        .then((resp) => {
          // console.log(resp.data);
          setNotCompleteOrders(resp.data.reverse());
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
    }
  }, [authUser]);

  function EachOrder({ orders, completed = false }) {
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //   api
    //     .get(`api/v1/orders?user=${authUser.user.id}`)
    //     .then((resp) => {
    //       // console.log(resp.data);
    //       setOrders(resp.data.reverse());
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         //not in the 200 range
    //         console.log(err.response.data);
    //         console.log(err.response.status);
    //         console.log(err.response.headers);
    //       } else {
    //         //response is undefined
    //         console.log(`Error: ${err.message}`);
    //       }
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }, []);

    return orders.map((order, index) => (
      <Card key={index} className="my-2">
        <Card.Body>
          <Row className="mx-5">
            <Col>
              <Card.Title>Order #{order.pin}</Card.Title>
            </Col>
            <Card.Subtitle className="mb-2 text-muted">
              Date of Transaction: {new Date(order.date).toUTCString()}
            </Card.Subtitle>
          </Row>
          <Row className="mx-5">
            <Col className="mx-2 my-3">
              <Card.Title>Items:</Card.Title>
              {order.items?.map((item, index) => (
                <ListGroup key={index}>
                  <ListGroup.Item className="my-1">
                    <Row className="my-1">
                      <OrderDetail itemId={item.item} qty={item.qty} />
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
              <Row className="my-3">
                <Card.Text>Subtotal: {currency(order.payment_subtotal)}</Card.Text>
                <Card.Text>Tax: {currency(order.payment_tax)}</Card.Text>
                <Card.Text>Total: {currency(order.payment_total)}</Card.Text>
              </Row>
              <Row>
                {completed ? (
                  <>
                    <Card.Subtitle style={{ textAlign: 'right' }} className="mb-2">
                      {order.state}
                    </Card.Subtitle>
                  </>
                ) : (
                  <>
                    {/* <Col></Col> */}
                    <Col style={{ textAlign: 'right' }}>
                      <Button
                        className="px-5"
                        size="md"
                        onClick={() => {
                          navigate('/', { state: order });
                        }}
                      >
                        Re-order
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  }

  return (
    <>
      <Container fluid="md" className="my-5">
        {!authUser.auth ? (
          'Guest'
        ) : (
          <>
            <Col>
              <h1>Active Orders</h1>
              <EachOrder orders={notCompleteOrders} completed={true} />
            </Col>
            <Col>
              <h1>Previous Orders</h1>
              {isLoading ? (
                <Card.Body>Loading...</Card.Body>
              ) : (
                <EachOrder orders={completedOrders} />
              )}
            </Col>
          </>
        )}
      </Container>
    </>
  );
}

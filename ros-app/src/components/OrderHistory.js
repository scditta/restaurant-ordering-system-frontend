import { useEffect, useState } from 'react';
import { Card, Container, Button, Col, Row, ListGroup } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../API/posts';
import { currency } from '../helpers/currency';

import OrderDetail from './OrderDetail';
import OrderPagination from './OrderPagination';

export default function OrderHistory() {
  const orderState = 'COMPLETE';

  //Specifications for pagination of orders
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);

  //Dates and datepicker state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  //Array of orders state
  const [orders, setOrders] = useState([]);

  const restartPagination = () => {
    setCurrentPage(1);
    setStart(0);
    setEnd(perPage);
  };

  let UserName = ({ userId }) => {
    // console.log(userId);
    // let userName = null;
    const [userName, setUserName] = useState(null);

    useEffect(() => {
      api
        .get(`api/v1/users/${userId}`)
        .then((resp) => {
          // console.log(resp.data.displayname);
          setUserName(resp.data.displayname);
          // return resp.data.displayname;
          // userName = resp.data.displayname;
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
        });
    }, [userId]);

    return userName;
  };

  //onchange for date selection
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDatePickerOpen(false);
    restartPagination();
  };

  const onClear = () => {
    // console.log('tets');
    api
      .get(`api/v1/orders?state=${orderState}`)
      .then((resp) => {
        // console.log(resp.data);
        setOrders(resp.data);
        // console.log(orders);
        // setStartDate('');
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
      });
  };

  useEffect(() => {
    if (startDate === null && endDate === null) {
      onClear();
    } else {
      api
        .get(
          `api/v1/orders?state=${orderState}&min=${startDate.toLocaleDateString(
            'en-CA'
          )}T00:00:00&max=${
            endDate != null
              ? endDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
              : startDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
          }`
        )
        .then((resp) => {
          // console.log(resp.data);
          setOrders(resp.data);
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
        });
    }
  }, [startDate, endDate]);

  const changePage = (selectedPage) => {
    //1 * 5 - 5
    //2 * 5 - 10
    const orderRange = selectedPage * perPage;
    // console.log(orders.slice(orderRange - perPage, orderRange));
    setStart(orderRange - perPage);
    setEnd(orderRange);
  };

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col className="my-2">
            <Button variant="primary" onClick={() => setDatePickerOpen(true)} className="me-2">
              Select Date
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                // onChange();
                restartPagination();
                onClear();
              }}
            >
              Clear
            </Button>
          </Col>
          <DatePicker
            // selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            open={datePickerOpen}
            onClickOutside={() => setDatePickerOpen(false)}
            // inline
          />
        </Row>
        {orders.length === 0 ? (
          <Card>No records found</Card>
        ) : (
          <>
            {orders.slice(start, end).map((order, index) => (
              <Card key={index} className="my-2">
                <Card.Body>
                  <Row className="mx-5">
                    <Col>
                      <Card.Title>Order #{order.pin}</Card.Title>
                    </Col>
                    <Col>
                      <Card.Title>
                        Customer: {order.user === null ? 'Guest' : <UserName userId={order.user} />}
                      </Card.Title>
                    </Col>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date of Transaction: {order.date}
                    </Card.Subtitle>
                  </Row>
                  <Row className="mx-5">
                    <Col className="mx-2 my-3">
                      {order.items?.map((item, index) => (
                        <ListGroup key={index}>
                          <ListGroup.Item className="my-1">
                            <Row className="my-1">
                              <OrderDetail itemId={item.item} />
                              <Col>
                                <Card.Text>Quantity: {item.qty}</Card.Text>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      ))}
                      <Row>
                        <Card.Text>Subtotal: {currency(order.payment_subtotal)}</Card.Text>
                        <Card.Text>Tax: {currency(order.payment_tax)}</Card.Text>
                        <Card.Text>Total: {currency(order.payment_total)}</Card.Text>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
        {/* <Row centered> */}
        <OrderPagination
          orderLength={orders.length}
          changePage={changePage}
          perPage={perPage}
          page={{ currentPage, setCurrentPage }}
        />
        {/* </Row> */}
      </Container>
    </>
  );
}

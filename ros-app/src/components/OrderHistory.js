import { useEffect, useRef, useState } from 'react';
import { Card, Container, Button, Col, Row } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../API/posts';

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
      <Container>
        <Button variant="primary" onClick={() => setDatePickerOpen(true)}>
          {/* {startDate.toLocaleDateString('en-CA')}
          {endDate === null ? <></> : <> - {endDate.toLocaleDateString('en-CA')}</>} */}
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
        <Col>
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
        </Col>
        {orders.length === 0 ? (
          <Card>No records found</Card>
        ) : (
          <>
            {orders.slice(start, end).map((order, index) => (
              <Card key={index}>
                <div>
                  <Row>
                    <Col>
                      <p>Order #{order.pin}</p>
                      <p>Date of Transaction: {order.date}</p>
                      <p>
                        Customer Info:{' '}
                        {order.user === null ? 'Guest' : <UserName userId={order.user} />}
                      </p>
                    </Col>
                    <Col>
                      {order.items?.map((item, index) => (
                        <div key={index}>
                          <OrderDetail itemId={item.item} />
                          <p>Quantity: {item.qty}</p>
                        </div>
                      ))}
                      <p>Subtotal: {order.payment_subtotal}</p>
                      <p>Tax: {order.payment_tax}</p>
                      <p>Total: {order.payment_total}</p>
                    </Col>
                  </Row>
                </div>
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

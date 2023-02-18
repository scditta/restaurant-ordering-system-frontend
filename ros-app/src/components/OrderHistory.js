import { useEffect, useRef, useState } from 'react';
import { Card, Container, Button, Col, Row, Pagination } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../API/posts';

import OrderDetail from './OrderDetail';

export default function OrderHistory() {
  const orderState = 'COMPLETE';

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  //onchange for date selection
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDatePickerOpen(false);
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
    // console.log(
    //   `api/v1/orders?state=${orderState}&min=${startDate.toLocaleDateString(
    //     'en-CA'
    //   )}T00:00:00&max=${
    //     endDate != null
    //       ? endDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
    //       : startDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
    //   }`
    // );
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

  // //component which gets the item data and
  // const OrderDetail = ({ itemId }) => {
  //   // console.log(itemId);
  //   const [item, setItem] = useState([]);

  //   useEffect(() => {
  //     console.log('itemEffect');
  //     api
  //       .get(`api/v1/items/${itemId}`)
  //       .then((resp) => {
  //         // console.log(resp.data);
  //         setItem(resp.data);
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           //not in the 200 range
  //           console.log(err.response.data);
  //           console.log(err.response.status);
  //           console.log(err.response.headers);
  //         } else {
  //           //response is undefined
  //           console.log(`Error: ${err.message}`);
  //         }
  //       });
  //   }, [itemId]);

  //   return (
  //     <>
  //       <p>{item.name}</p>
  //       {/* <p>{item.description}</p> */}
  //       <p>{item.price}</p>
  //     </>
  //   );
  // };

  const [activePagination, setActivePagination] = useState(1);
  const page = useRef(1);
  //Pagination Component
  const OrderPagination = () => {
    // let active = 1;
    let paginationItems = [];
    const perPage = 5;

    for (let number = 1; number <= Math.ceil(orders.length / perPage); number++) {
      // console.log(page.current);
      paginationItems.push(
        <Pagination.Item key={number} active={page.current === number} data-page={number}>
          {number}
        </Pagination.Item>
      );
    }

    const paginationClick = (e) => {
      // console.log(e.target.getAttribute('data-page'));
      // setActivePagination(e.target.getAttribute('data-page'));
      page.current = e.target.getAttribute('data-page');
      console.log(page.current);
      // console.log(activePagination);
      // console.log(activePagination * perPage);
    };

    useEffect(() => {
      // console.log(activePagination);
      // active = activePagination;
    }, []);

    return (
      <Pagination onClick={paginationClick} className="d-flex justify-content-center">
        {paginationItems}
      </Pagination>
    );
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
            {orders?.map((order, index) => (
              <Card key={index}>
                <div>
                  <Row>
                    <Col>
                      <p>Order #{order.pin}</p>
                      <p>Date of Transaction: {order.date}</p>
                      <p>Customer Info: {order.user === null ? 'Guest' : order.user}</p>
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
        <OrderPagination />
        {/* </Row> */}
      </Container>
    </>
  );
}

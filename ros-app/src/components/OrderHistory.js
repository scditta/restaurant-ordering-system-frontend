import { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import api from '../API/posts';

export default function OrderHistory() {
  const orderState = 'COMPLETE';

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    api
      .get(`api/v1/orders?state=${orderState}`)
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
  }, []);

  return (
    <>
      <Container>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          // inline
        />
        <Button variant="primary">Clear</Button>
        {orders?.map((order, index) => (
          <Card key={index}>
            <div>
              <p>Order #{order.pin}</p>
              <p>Date of Transaction: {order.date}</p>
              <p>Customer Info: {order.user === null ? 'Guest' : order.user}</p>
              {order.items?.map((item, index) => (
                <div key={index}>
                  <p>{item.item}</p>
                  <p>Quantity: {item.qty}</p>
                </div>
              ))}
              <p>Subtotal: {order.payment_subtotal}</p>
              <p>Tax: {order.payment_tax}</p>
              <p>Total: {order.payment_total}</p>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}

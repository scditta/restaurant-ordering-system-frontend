import { useState, useEffect } from 'react';
import { Card, Image, Button, Container, Row, Col } from 'react-bootstrap';

import api from '../API/posts';

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export default function Offers() {
  const [coupons, setCoupons] = useState([]);

  const formatCurrency = (cents) =>
    (cents / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' });

  const getItem = async (id) => {
    try {
      const response = await api.get(`api/v1/items/${id}`);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      return false;
    }
  };

  useEffect(() => {
    const getCoupons = () => {
      api
        .get(`api/v1/coupons`)
        .then(async (response) => {
          const currentCoupons = [];
          const date = new Date();
          const dayOfWeek = WEEKDAYS[date.getDay()];

          for (const coupon of response.data) {
            if (coupon.availability.includes(dayOfWeek)) {
              const foundItem = await getItem(coupon.item);

              if (foundItem) {
                coupon.item = foundItem;
                currentCoupons.push(coupon);
              }
            }
          }

          setCoupons(currentCoupons);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        });
    };
    getCoupons();
  }, []);

  return (
    <>
      <h1>Offers</h1>
      {coupons.map((coupon) => (
        <Row>
          <Col xs={4}>
            <Card key={coupon.id} className="mb-2">
              <Card.Body>
                <Image
                  className="cardImage"
                  src={coupon.item.image}
                  fluid
                  style={{
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
                <br />
                <b>{coupon.discount_percent}%</b> off {coupon.item.name}!<br />
                <s>{formatCurrency(coupon.item.price)}</s>&nbsp;
                <b>{formatCurrency((coupon.item.price * (100 - coupon.discount_percent)) / 100)}</b>
                <br />
                <br />
                <div className="d-grid gap-2 mt-2">
                  <Button onClick={() => {}}>
                    Code: <b>{coupon.code}</b>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
}

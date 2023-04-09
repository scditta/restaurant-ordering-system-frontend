import { useState, useEffect } from 'react';
import { Card, Image, Button, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { currency } from '../helpers/currency';
import api from '../API/posts';

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export default function Offers() {
  const [coupons, setCoupons] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const applyCoupon = (code) => {
    setToastText(`Applied coupon ${code} to cart.`);
    setShowToast(true);
  };

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
      {coupons.length > 0 ? (
        <>
          <h1>Offers</h1>
          <Row className="g-4">
            {coupons.map((coupon) => (
              <Col xs={4} key={coupon.id}>
                <Card className="mb-2">
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
                    <s>{currency(coupon.item.price)}</s>&nbsp;
                    <b>{currency((coupon.item.price * (100 - coupon.discount_percent)) / 100)}</b>
                    <br />
                    <br />
                    <div className="d-grid gap-2 mt-2">
                      <Button
                        onClick={() => {
                          applyCoupon(coupon.code);
                        }}
                      >
                        Code: <b>{coupon.code}</b>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <></>
      )}
      <ToastContainer className="p-3 position-fixed" position="top-center">
        <Toast
          autohide={true}
          delay={2000}
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        >
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

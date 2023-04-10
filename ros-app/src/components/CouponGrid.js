import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CouponGridContext from '../context/CouponGridContext';
import Coupon from './Coupon.js';
import { AddCouponButton } from './AddCouponButton';

export function CouponGrid() {
  const couponData = useContext(CouponGridContext);

  return (
    <>
      <Container style={{ paddingTop: '15px' }}>
        <AddCouponButton></AddCouponButton>
        <Row className="pt-3">
          <Col md={8}>
            <h1 style={{ borderBottom: '1px solid black' }}>Coupons</h1>
            {couponData.coupons.map((coupon, index) => (
              <div key={index}>
                <Coupon
                  id={coupon.id}
                  itemId={coupon.item}
                  code={coupon.code}
                  availability={coupon.availability}
                  discount_percent={coupon.discount_percent}
                  updateCouponCallback={couponData.updateCouponGrid}
                ></Coupon>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

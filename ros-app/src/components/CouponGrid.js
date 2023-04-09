import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CouponGridContext from '../context/CouponGridContext';
import Coupon from './Coupon.js';
export function CouponGrid() {
  const couponData = useContext(CouponGridContext);

  return (
    <>
      <Container>
        <Row className="pt-3">
          <Col md={8}>
            {couponData.coupons.map((coupon, index) => (
              <div key={index}>
                <Coupon
                  id={coupon.id}
                  code={coupon.code}
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

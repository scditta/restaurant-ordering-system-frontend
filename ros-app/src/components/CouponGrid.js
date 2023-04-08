import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CouponGridContext from '../context/CouponGridContext';
import Coupon from './Coupon.js';
export function CouponGrid() {
  const couponData = useContext(CouponGridContext);
  //   console.log(couponData);
  //   const [couponsData, setCouponsData] = useState(couponData);
  //   useEffect(() => {
  //     const fetchCoupons = async () => {
  //       const getResponse = await api.get(`api/v1/coupons`);
  //       console.log(getResponse);
  //       setCouponsData(getResponse);
  //     };

  //     fetchCoupons();
  //   }, [couponsData]);
  //   useEffect(() => {
  //     updateCoupons();
  //   });

  //   const updateCoupons = async (e) => {
  //     try {
  //       const getResponse = await api.get(`api/v1/coupons`);
  //       setCouponsData(getResponse.data);
  //     } catch (err) {
  //       if (err.response) {
  //         //not in the 200 range
  //         console.log(err.getResponse.data);
  //         console.log(err.getResponse.status);
  //         console.log(err.getResponse.headers);
  //       } else {
  //         //response is undefined
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };

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

import { useEffect, useRef, useState } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';

import api from '../../API/posts';

export default function ChangeCoupon() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    api
      .get(`/api/v1/coupons/`)
      .then((resp) => {
        // console.log(resp.data);
        setCoupons(resp.data);
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

  const CouponItem = ({ itemid }) => {
    const [item, setItem] = useState({});
    // console.log(itemid);

    useEffect(() => {
      api
        .get(`/api/v1/items/${itemid}`)
        .then((resp) => {
          // console.log(resp.data);
          setItem(resp.data);
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
    }, [itemid]);

    // <Card.Img src=''/>
    return (
      // <Row className="mx-5">
      <>
        <Col>
          <Card.Img src={item.image} />
          <Card.Body>{item.name}</Card.Body>
        </Col>
        <Col></Col>
      </>
    );
  };

  const DaysOfWeeks = (props) => {
    // console.log(props.coupon);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const couponId = props.coupon.id;
    const [selectedCoupon, setSelectedCoupon] = useState({
      item: props.coupon.item,
      discount_percent: props.coupon.discount_percent,
      code: props.coupon.code,
      availability: props.coupon.availability,
    });
    let initialRender = useRef(true);

    function CheckBox(props) {
      const checkboxHandler = (e) => {
        initialRender.current = false;
        // console.log('click', props.coupon);
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name);
        // console.log(value);
        if (!selectedCoupon.availability.includes(value)) {
          setSelectedCoupon((oldArray) => {
            return {
              ...oldArray,
              [name]: [...oldArray.availability, value],
            };
          });
        } else {
          // console.log(selectedCoupon.availability.filter((coupon) => coupon !== value));
          setSelectedCoupon((oldArray) => {
            return {
              ...oldArray,
              [name]: selectedCoupon.availability.filter((coupon) => coupon !== value),
            };
          });
        }

        // console.log(selectedCoupon);
        // console.log(couponId);
      };

      // console.log(selectedCoupon);
      // console.log(props);
      return (
        <Form.Check
          label={props.day}
          inline
          name="availability"
          type="checkbox"
          value={props.day.toUpperCase()}
          checked={selectedCoupon.availability.includes(props.day.toUpperCase())}
          onChange={checkboxHandler}
        />
      );
    }

    useEffect(() => {
      // console.log('Updated state, ', selectedCoupon);
      // console.log(couponId);
      if (!initialRender.current) {
        api
          .put(`/api/v1/coupons/${couponId}`, selectedCoupon)
          .then((resp) => {
            console.log(resp);
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
    }, [selectedCoupon, couponId]);

    return (
      <Form>
        {days.map((day, index) => (
          <CheckBox key={index} day={day} coupon={props.coupon} />
        ))}
      </Form>
    );
  };

  return (
    <>
      <Container fluid="md">
        {coupons.map((coupon, index) => (
          <Card key={index} className="my-2">
            <Card.Body>
              {/* <Row className="mx-5"> */}
              <Row className="mx-5">
                <CouponItem itemid={coupon.item} />
                <Col>
                  <DaysOfWeeks coupon={coupon} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

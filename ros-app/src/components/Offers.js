import { Card, Image, Button, Row, Col } from 'react-bootstrap';
import { currency } from '../helpers/currency';

export default function Offers(props) {
  const coupons = props.coupons;

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
                          props.addCouponCallback(coupon.code);
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
    </>
  );
}

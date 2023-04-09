import { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import api from '../API/posts';

import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

import AuthenticationContext from '../context/AuthenticationContext';
// import api from '../API/posts';

export default function Coupon(props) {
  const authUser = useContext(AuthenticationContext);

  async function handleDelete() {
    console.log('dete');
    try {
      console.log(props);
      const response = await api.delete(`api/v1/coupons/${props.id}`);
      props.updateCouponCallback(response);
      console.log(response);
    } catch {}
  }

  return (
    <>
      <Row alt={props.item} className="mb-3 mt-4" style={{ borderBottom: '1px solid black' }}>
        <Col xs={5}>
          <p>Coupon Code: {props.code}</p>
          <p>Discount: {(props.discount_percent * 100).toFixed()}%</p>
        </Col>
        <Col>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
        {/* If the user logged in is an admin */}
        {/* {authUser.authorization ? (
          <>
            <Col xs={2}>
              <UpdateCategory categoryName={props.categoryName} categoryId={props.categoryId} />
            </Col>
            <Col xs={2}>
              <DeleteCategory categoryName={props.categoryName} categoryId={props.categoryId} />
            </Col>
          </>
        ) : (
          <></>
        )} */}
      </Row>
    </>
  );
}

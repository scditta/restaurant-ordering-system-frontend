import { useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import Icon from './Icon';

import AuthenticationContext from '../AuthenticationContext';

// import api from '../API/posts';

export default function Category(props) {
  const authUser = useContext(AuthenticationContext);

  useEffect(() => {
    // console.log(props.itemId);
  }, []);

  return (
    <>
      <Row alt={props.categoryId} className="mb-3 mt-4">
        <Col xs={6}>
          <h1>{props.categoryName}</h1>
        </Col>
        {/* If the user logged in is an admin */}
        {authUser.authorization ? (
          <Col xs={2}>
            <Icon
              icon={'http://www.w3.org/2000/svg'}
              categoryId={props.categoryId}
              type={'category'}
            />
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}

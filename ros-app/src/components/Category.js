import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

import AuthenticationContext from '../context/AuthenticationContext';
// import api from '../API/posts';

export default function Category(props) {
  const authUser = useContext(AuthenticationContext);

  return (
    <>
      <Row alt={props.categoryId} className="mb-3 mt-4">
        <Col xs={6}>
          <h1>{props.categoryName}</h1>
        </Col>
        {/* If the user logged in is an admin */}
        {authUser.authorization ? (
          <>
            <Col>
              <UpdateCategory categoryName={props.categoryName} categoryId={props.categoryId} />
            </Col>
            <Col>
              <DeleteCategory categoryName={props.categoryName} categoryId={props.categoryId} />
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}

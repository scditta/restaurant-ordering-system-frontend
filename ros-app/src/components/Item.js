import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col, Modal } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';
import api from '../API/posts';
// import Icon from './Icon';
import ItemForm from './ItemForm/ItemForm';

export default function Item(props) {
  const [item, setItemData] = useState([]);
  const authUser = useContext(AuthenticationContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    //Fetch the item and insert its data
    const fetchItem = async () => {
      try {
        const response = await api.get(`api/v1/items/${props.itemId}`);
        setItemData(response.data);
      } catch (err) {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchItem();
  }, [props.itemId]);

  const handleClick = () => {
    if (authUser.authorization) {
      setShow(true);
    }
  };

  return (
    <>
      <Row alt={item.id} className="mb-3" style={{ cursor: 'pointer' }} onClick={handleClick}>
        <Col>
          <Image className="cardImage" src={item.image}></Image>
        </Col>
        <Col>
          <Row>
            <h6>{item.name}</h6>
          </Row>
          <Row>{item.description}</Row>
        </Col>
        <Col>
          {(item.price / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' })}
        </Col>
        {/* If the user logged in is an admin */}
        {authUser.authorization ? (
          <Col>
            {/* <Icon
              icon={'http://www.w3.org/2000/svg'}
              itemId={item.id}
              categoryId={props.categoryId}
              type={'item'}
            /> */}
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemForm categoryId={props.categoryId} closeModalCallback={handleClose} item={item} />
        </Modal.Body>
      </Modal>
    </>
  );
}

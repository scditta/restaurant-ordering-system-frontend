import { useState, useEffect, useContext } from 'react';
import { Row, Image, Col, Modal } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';
import api from '../API/posts';
import ItemForm from './ItemForm/ItemForm';
import ItemCartForm from './ItemCartForm';

export default function Item(props) {
  const [item, setItemData] = useState([]);
  const authUser = useContext(AuthenticationContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);

  const [showCartForm, setShowCartForm] = useState(false);
  const handleCloseCartForm = () => setShowCartForm(false);

  useEffect(() => {
    updateItem(props.itemId);
  }, [props.itemId]);

  //Fetch the item and insert its data
  const updateItem = async (itemId) => {
    try {
      const response = await api.get(`api/v1/items/${itemId}`);
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

  const handleClick = () => {
    if (authUser.authorization) {
      setShowEdit(true);
    } else {
      setShowCartForm(true);
    }
  };

  return (
    <>
      <Row alt={item.id} className="mb-3 py-2" style={{ cursor: 'pointer' }} onClick={handleClick}>
        <Col>
          <Image className="cardImage" src={item.image}></Image>
        </Col>
        <Col>
          <Row>
            <h6>{item.name}</h6>
          </Row>
          <Row>
            <p>{item.description}</p>
          </Row>
        </Col>
        <Col>
          <p style={{ textAlign: 'center' }}>
            {(item.price / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' })}
          </p>
        </Col>
      </Row>

      <Modal show={showEdit} onHide={handleCloseEdit} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemForm
            categoryId={props.categoryId}
            closeModalCallback={handleCloseEdit}
            item={item}
            updateItemCallBack={updateItem}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showCartForm} onHide={handleCloseCartForm} animation={false} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemCartForm closeModalCallback={handleCloseCartForm} item={item} />
        </Modal.Body>
      </Modal>
    </>
  );
}

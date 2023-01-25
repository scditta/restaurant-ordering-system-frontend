import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ItemForm from './ItemForm/ItemForm';

export default function AddItemButton(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" type="button" onClick={handleShow}>
        + Add Item
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemForm categoryId={props.categoryId} closeModalCallback={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

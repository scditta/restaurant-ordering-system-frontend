import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AddItemButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" type="button" onClick={handleShow}>
        + Add Item
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Text goes here.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

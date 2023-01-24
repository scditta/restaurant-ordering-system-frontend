import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';

export default function AddItemButton() {
  const authUser = useContext(AuthenticationContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {authUser.authorization ? (
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
      ) : (
        <></>
      )}
    </>
  );
}

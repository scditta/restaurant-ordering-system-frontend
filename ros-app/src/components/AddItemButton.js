import { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

import MenuContext from '../context/MenuContext';

export default function AddItemButton(props) {
  const NAME_MAX = 40;
  const DESCRIPTION_MAX = 100;

  const [itemData, setItemData] = useState({
    name: '',
    category: props.categoryId,
    description: '',
    price: 0,
    image: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const valueRaw = e.target.value;
    let valueValidated = valueRaw;

    setItemData((prevItemData) => {
      return {
        ...prevItemData,
        [name]: valueValidated,
      };
    });
  };

  const menuData = useContext(MenuContext);

  return (
    <>
      <Button variant="primary" type="button" onClick={handleShow}>
        + Add Item
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Item Name"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                maxLength={NAME_MAX}
              ></Form.Control>
              <Form.Text className={itemData.name.length < NAME_MAX ? 'text-muted' : 'text-danger'}>
                {NAME_MAX - itemData.name.length} character(s) remaining
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={itemData.category} onChange={handleChange}>
                {menuData.categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Brief description of item"
                name="description"
                value={itemData.description}
                onChange={handleChange}
                maxLength={DESCRIPTION_MAX}
                rows={3}
                style={{ resize: 'none' }}
              ></Form.Control>
              <Form.Text
                className={
                  itemData.description.length < DESCRIPTION_MAX ? 'text-muted' : 'text-danger'
                }
              >
                {DESCRIPTION_MAX - itemData.description.length} character(s) remaining
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control placeholder="0.00" />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

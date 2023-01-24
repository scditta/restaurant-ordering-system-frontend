import { useState, useContext, useCallback } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

import MenuContext from '../context/MenuContext';

export default function AddItemButton(props) {
  const NAME_MAX = 40;
  const DESCRIPTION_MAX = 100;
  const PRICE_MIN = 0;

  const [itemData, setItemData] = useState({
    name: '',
    category: props.categoryId,
    description: '',
    price: PRICE_MIN,
    image: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const valueRaw = e.target.value;
    let valueValidated = valueRaw;

    switch (name) {
      case 'price':
        valueValidated = parseFloat(valueRaw);
        if (isNaN(valueValidated) || valueValidated < PRICE_MIN) {
          valueValidated = PRICE_MIN;
        }
        valueValidated = valueValidated.toFixed(2);
        e.target.value = valueValidated;
        break;
      default:
    }

    setItemData((prevItemData) => {
      return {
        ...prevItemData,
        [name]: valueValidated,
      };
    });
  };

  const menuData = useContext(MenuContext);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          <Form>
            <Container>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>

                    <div
                      style={{
                        backgroundColor: 'rgb(233 233 233)',
                        border: '3px dashed',
                        padding: '1em',
                        margin: '1em',
                        aspectRatio: '1/1',
                        color: 'rgb(122 122 122)',
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? <p>Drop the files here ...</p> : <p>Upload Image</p>}
                    </div>
                  </Form.Group>
                </Col>

                <Col lg={true}>
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
                    <Form.Text
                      className={itemData.name.length < NAME_MAX ? 'text-muted' : 'text-danger'}
                    >
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
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min={PRICE_MIN}
                        name="price"
                        onBlur={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
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

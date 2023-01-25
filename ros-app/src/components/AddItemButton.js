import { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Container,
  Alert,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from 'react-bootstrap';

import ImageUpload from './ImageUpload';
import MenuContext from '../context/MenuContext';
import api from '../API/posts';

export default function AddItemButton(props) {
  const NAME_MAX = 40;
  const DESCRIPTION_MAX = 100;
  const PRICE_MIN = 0;

  const menuData = useContext(MenuContext);

  const defaultItemData = {
    name: '',
    category: props.categoryId,
    description: '',
    price: null,
    image: null,
  };
  const [itemData, setItemData] = useState({ ...defaultItemData });

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = () => {
    setError(null);
    setIsLoading(true);
    api
      .post(`api/v1/items/${itemData.category}`, {
        name: itemData.name,
        description: itemData.description,
        price: itemData.price * 100, //save as cents in db, NOT dollars
        image: itemData.image,
      })
      .then((res) => {
        setItemData({ ...defaultItemData });
        setShow(false);
        menuData.updateMenu();
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const imageUpdate = (result) => {
    if (result.success) {
      setError(null);
    } else {
      setError(result.message);
    }

    setItemData((prevItemData) => {
      return {
        ...prevItemData,
        image: result.imageBinary,
      };
    });
  };

  useEffect(() => {
    setIsValid(
      itemData.name.length > 0 &&
        itemData.description.length > 0 &&
        itemData.image !== null &&
        itemData.price > 0
    );
  }, [itemData]);

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
            <Container style={{ paddingBottom: '0.75rem' }}>
              <Row>
                <Col lg={true}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <ImageUpload imageUpdateCallback={imageUpdate}></ImageUpload>
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
              <Row style={{ minHeight: '5em' }}>
                <Col>{error ? <Alert variant="danger">{error}</Alert> : null}</Col>
              </Row>
              <Row>
                <Col style={{ display: 'flex' }}>
                  <Button variant="secondary" onClick={handleClose} style={{ marginLeft: 'auto' }}>
                    Close
                  </Button>
                  <OverlayTrigger
                    overlay={
                      isValid ? (
                        <></>
                      ) : (
                        <Tooltip id="tooltip-disabled">Please fill out all fields</Tooltip>
                      )
                    }
                  >
                    <span className="d-inline-block" style={{ paddingLeft: '0.5rem' }}>
                      <Button
                        variant="primary"
                        disabled={isLoading || !isValid}
                        onClick={handleSubmit}
                        style={{
                          minWidth: '9em',
                        }}
                      >
                        {isLoading ? <Spinner animation="border" size="sm" /> : <>Save New Item</>}
                      </Button>
                    </span>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

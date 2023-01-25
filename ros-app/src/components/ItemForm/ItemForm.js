import { useState, useContext, useEffect } from 'react';
import {
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
import MenuContext from '../../context/MenuContext';
import api from '../../API/posts';

export default function ItemForm(props) {
  const NAME_MAX = 40;
  const DESCRIPTION_MAX = 100;
  const PRICE_MIN = 0;

  const menuData = useContext(MenuContext);

  let defaultItemData = {
    name: '',
    category: props.categoryId,
    description: '',
    price: 0,
    image: null,
  };
  // If item passed to component, set as default values.
  if (props.item) {
    defaultItemData = {
      name: props.item.name,
      category: props.categoryId,
      description: props.item.description,
      price: parseInt(props.item.price / 100),
      image: props.item.image,
    };
  }

  const [itemData, setItemData] = useState({ ...defaultItemData });
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    if (props.item) {
      api
        .put(`api/v1/items/${props.item.id}`, {
          name: itemData.name,
          description: itemData.description,
          price: itemData.price * 100, //save as cents in db, NOT dollars
          image: itemData.image,
        })
        .then((res) => {
          props.closeModalCallback();
          //menuData.updateMenu();
          window.location.reload(); // Calling updateMenu() doesn't work here for some reason
        })
        .catch((err) => {
          setError(err.response.data.error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      api
        .post(`api/v1/items/${itemData.category}`, {
          name: itemData.name,
          description: itemData.description,
          price: itemData.price * 100, //save as cents in db, NOT dollars
          image: itemData.image,
        })
        .then((res) => {
          setItemData({ ...defaultItemData });
          props.closeModalCallback();
          menuData.updateMenu();
        })
        .catch((err) => {
          setError(err.response.data.error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
        itemData.image !== '' &&
        itemData.price > 0
    );
  }, [itemData]);

  const handleDelete = () => {
    api
      .delete(`api/v1/items/${props.item.id}/${props.categoryId}`)
      .then((res) => {
        props.closeModalCallback();
        menuData.updateMenu();
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form>
      <Container style={{ paddingBottom: '0.75rem' }}>
        <Row>
          <Col lg={true}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <ImageUpload
                imageUpdateCallback={imageUpdate}
                defaultImage={props.item ? props.item.image : null}
              ></ImageUpload>
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
            {props.item ? (
              <Button variant="danger" style={{ minWidth: '9em' }} onClick={handleDelete}>
                Delete Item
              </Button>
            ) : null}

            <Button
              variant="secondary"
              onClick={props.closeModalCallback}
              style={{ marginLeft: 'auto', minWidth: '9em' }}
            >
              Discard Changes
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
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>{props.item ? 'Update Item' : 'Create Item'}</>
                  )}
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

import { useState, useContext, useCallback } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col, Container, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

import MenuContext from '../context/MenuContext';

export default function AddItemButton(props) {
  const NAME_MAX = 40;
  const DESCRIPTION_MAX = 100;
  const PRICE_MIN = 0;
  const IMAGE_MAX_MB = 8;
  const IMAGE_FNAME_MAX = 100;

  // Image filetypes accepted by image upload widget
  // Key - Common MIME type (see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
  // Value - Accepted file extension names
  const IMAGE_ACCEPTED_FILETYPES = {
    'image/png': ['.png'],
    'image/bmp': ['.bmp'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/webp': ['.webp'],
  };

  const menuData = useContext(MenuContext);
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

  const onDrop = useCallback((acceptedFiles) => {
    /*
    acceptedFiles.map((file) => {
      //Handle accepted file
    });
    */
  }, []);

  function imageSizeValidator(file) {
    if (file.name.length > IMAGE_FNAME_MAX) {
      return {
        code: 'fname-too-large',
        message: `File name is too long (max length: ${IMAGE_FNAME_MAX} characters).`,
      };
    }

    if (file.size > IMAGE_MAX_MB * 1000000) {
      return {
        code: 'size-too-large',
        message: `Image is too large (max size: ${IMAGE_MAX_MB}MB).`,
      };
    }
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: onDrop,
    accept: IMAGE_ACCEPTED_FILETYPES,
    maxFiles: 1,
    validator: imageSizeValidator,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Alert variant="warning" key={file.path} style={{ marginBottom: '0rem' }}>
      Unable to upload '{file.path}'.
      <ul style={{ marginBottom: '0.25rem' }}>
        {errors.map((e) => {
          let message = null;
          switch (e.code) {
            case 'file-invalid-type':
              message = `File type must be:`;
              Object.values(IMAGE_ACCEPTED_FILETYPES).forEach((filetype) => {
                message += ` ${filetype[0]}`;
              });
              break;
            default:
              message = e.message;
          }
          return <li key={e.code}>{message}</li>;
        })}
      </ul>
    </Alert>
  ));

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
                    <div style={{ margin: '2em' }}>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: 'rgb(233 233 233)',
                          border: '3px dashed',
                          marginBottom: '0.5em',
                          aspectRatio: '1/1',
                          color: 'rgb(122 122 122)',
                          borderRadius: '0.5em',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div>
                          {isDragActive ? (
                            'Drop file here...'
                          ) : (
                            <>
                              Drag and drop image here<br></br>(
                              {Object.values(IMAGE_ACCEPTED_FILETYPES).map((filetype, i, arr) => (
                                <span key={filetype[0]}>
                                  {filetype[0]}
                                  {i < arr.length - 1 && ' '}
                                </span>
                              ))}
                              )
                            </>
                          )}
                        </div>
                      </div>

                      <span className="text-muted">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-info-circle"
                          viewBox="0 0 16 16"
                          style={{
                            marginRight: '0.2em',
                            transform: 'translate(0px, -2px)',
                          }}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                        Image size cannot exceed {IMAGE_MAX_MB}MB.
                      </span>
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
              <Row>
                <Col>{fileRejectionItems}</Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save New Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

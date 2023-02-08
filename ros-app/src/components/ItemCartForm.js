import { useState, useContext } from 'react';
import { Image, Button, Container, Row } from 'react-bootstrap';

export default function ItemCartForm(props) {
  const [qty, setQty] = useState(1);

  const addQty = () => {
    setQty(qty + 1);
  };

  const subQty = () => {
    setQty(qty - 1);
  };

  const handleSubmit = () => {
    props.addCartCallback(props.item.id, qty, props.item.name, props.item.price);
    props.closeModalCallback();
  };

  return (
    <Container style={{ padding: '0.5em' }}>
      <Row>
        <Image
          src={props.item.image}
          fluid
          style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1em' }}
        ></Image>
      </Row>
      <Row>
        <span>{props.item.description}</span>
      </Row>
      <Row className="mb-2">
        <span
          style={{ fontWeight: 'bold', marginLeft: 'auto', marginBottom: '2em', width: 'auto' }}
        >
          {(props.item.price / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' })}
        </span>
      </Row>

      <Row>
        <span
          style={{
            fontWeight: 'bold',
            marginTop: 'auto',
            marginBottom: 'auto',
            width: 'auto',
            userSelect: 'none',
          }}
        >
          Quantity
        </span>

        <span style={{ marginLeft: 'auto', width: 'auto' }}>
          <Button
            variant="secondary"
            style={{ minWidth: '2.2em' }}
            onClick={subQty}
            disabled={qty <= 1}
          >
            -
          </Button>
          <span
            style={{
              fontWeight: 'bold',
              marginTop: 'auto',
              marginBottom: 'auto',
              marginLeft: '1em',
              marginRight: '1em',
              userSelect: 'none',
            }}
          >
            {qty}
          </span>
          <Button variant="secondary" style={{ minWidth: '2.2em' }} onClick={addQty}>
            +
          </Button>
        </span>
      </Row>

      <div className="d-grid gap-2 mt-2">
        <Button onClick={handleSubmit}>Add To Cart</Button>
      </div>
    </Container>
  );
}

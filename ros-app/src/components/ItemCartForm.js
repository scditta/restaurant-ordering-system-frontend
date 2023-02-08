import { Image, Button, Container, Row } from 'react-bootstrap';

export default function ItemCartForm(props) {
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
          style={{ fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', width: 'auto' }}
        >
          Quantity
        </span>

        <span style={{ marginLeft: 'auto', width: 'auto' }}>
          <Button variant="secondary" style={{ minWidth: '2.2em' }}>
            -
          </Button>
          <span
            style={{
              fontWeight: 'bold',
              marginTop: 'auto',
              marginBottom: 'auto',
              marginLeft: '1em',
              marginRight: '1em',
            }}
          >
            1
          </span>
          <Button variant="secondary" style={{ minWidth: '2.2em' }}>
            +
          </Button>
        </span>
      </Row>

      <div className="d-grid gap-2 mt-2">
        <Button>Add To Cart</Button>
      </div>
    </Container>
  );
}

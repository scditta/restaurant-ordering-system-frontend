import { Card, Button } from 'react-bootstrap';

export default function Cart() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Cart</Card.Title>
        <Card.Text>
          Subtotal:<span className="float-end">$0.00</span>
          <br />
          Tax:<span className="float-end">$0.00</span>
          <hr></hr>
          Total:<span className="float-end">$0.00</span>
        </Card.Text>
        <div className="d-grid gap-2">
          <Button>Checkout</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

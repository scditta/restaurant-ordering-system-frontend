import { Card, Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';

export default function Cart(props) {
  const cartEntryIds = Object.keys(props.cart);
  const cartEntries = props.cart;

  const cartItems = cartEntryIds.map((id) => {
    const cartItem = cartEntries[id];
    return (
      <Card key={id} className="mb-2">
        <Card.Body>
          <span>{cartItem.name}</span>
          <span className="float-end">
            Qty: {cartItem.qty}
            <XCircleFill size={24} style={{ marginLeft: '1em', cursor: 'pointer' }}></XCircleFill>
          </span>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Card style={{ position: 'sticky', top: '1em' }}>
      <Card.Body>
        <Card.Title>Cart</Card.Title>
        <div style={{ minHeight: '30vh' }}>{cartItems}</div>

        <div>
          Subtotal:
          <span className="float-end">$0.00</span>
        </div>
        <div>
          Tax:
          <span className="float-end">$0.00</span>
        </div>

        <hr className="mt-2 mb-2"></hr>

        <div style={{ fontWeight: 'bold' }}>
          Total:
          <span className="float-end">$0.00</span>
        </div>

        <div className="d-grid gap-2 mt-2">
          <Button>Checkout</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

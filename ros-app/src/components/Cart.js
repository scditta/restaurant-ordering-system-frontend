import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';

export default function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const hideCheckout = () => setShowCheckout(false);

  const cartEntryIds = Object.keys(props.cart);
  const cartEntries = props.cart;

  const formatCurrency = (cents) =>
    (cents / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' });

  let subtotal = 0;
  const cartItems = cartEntryIds.map((id) => {
    const cartItem = cartEntries[id];
    subtotal += cartItem.price * cartItem.qty;

    return (
      <Card key={id} className="mb-2">
        <Card.Body>
          <span>{cartItem.name}</span>
          <span className="float-end">
            Qty: {cartItem.qty}
            <XCircleFill
              size={24}
              style={{ marginLeft: '1em', cursor: 'pointer' }}
              onClick={() => {
                props.removeCartCallback(id);
              }}
            ></XCircleFill>
          </span>
        </Card.Body>
      </Card>
    );
  });

  const tax = Math.ceil(subtotal * 0.13);
  const total = subtotal + tax;

  const subtotalFormatted = formatCurrency(subtotal);
  const taxFormatted = formatCurrency(tax);
  const totalFormatted = formatCurrency(total);

  return (
    <>
      <Card style={{ position: 'sticky', top: '1em' }}>
        <Card.Body>
          <Card.Title>Cart</Card.Title>
          <div style={{ minHeight: '30vh' }}>{cartItems}</div>

          <div>
            Subtotal:
            <span className="float-end">{subtotalFormatted}</span>
          </div>
          <div>
            Tax:
            <span className="float-end">{taxFormatted}</span>
          </div>

          <hr className="mt-2 mb-2"></hr>

          <div style={{ fontWeight: 'bold' }}>
            Total:
            <span className="float-end">{totalFormatted}</span>
          </div>

          <div className="d-grid gap-2 mt-2">
            <Button onClick={setShowCheckout}>Checkout</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showCheckout} onHide={hideCheckout} animation={false} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}

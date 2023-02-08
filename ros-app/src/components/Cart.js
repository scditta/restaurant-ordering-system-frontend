import { Card, Button } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';

export default function Cart() {
  return (
    <Card style={{ position: 'sticky', top: '1em' }}>
      <Card.Body>
        <Card.Title>Cart</Card.Title>
        <div style={{ minHeight: '30vh' }}>
          <Card>
            <Card.Body>
              <span>Vanilla Ice Cream</span>
              <span className="float-end">
                Qty: 1 <XCircleFill size={24} style={{ marginLeft: '1em' }}></XCircleFill>
              </span>
            </Card.Body>
          </Card>
        </div>
        <Card.Text>
          <div>
            Subtotal:
            <span className="float-end">$0.00</span>
          </div>
          <div>
            Tax:
            <span className="float-end">$0.00</span>
          </div>
          <hr className="mt-2 mb-2"></hr>
          <div>
            Total:
            <span className="float-end">$0.00</span>
          </div>
        </Card.Text>
        <div className="d-grid gap-2">
          <Button>Checkout</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

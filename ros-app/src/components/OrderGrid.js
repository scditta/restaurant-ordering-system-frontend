import { useContext } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import OrderGridContext from '../context/OrderGridContext';
import Order from './Order';
export default function OrderGrid(props) {
  const orderData = useContext(OrderGridContext);

  return (
    <>
      <Container className="menuHeight" fluid>
        <Row className=" g-0 overflow-auto">
          {orderData.orders.map((order, index) => (
            <Order
              key={index}
              orderId={order.id}
              orderData={order}
              showActiveOrder={props.showActiveOrder}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

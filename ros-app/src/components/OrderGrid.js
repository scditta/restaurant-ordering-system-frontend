import { useContext } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import OrderGridContext from '../context/OrderGridContext';
import Order from './Order';
export default function OrderGrid(props) {
  const orderData = useContext(OrderGridContext);

  return (
    <>
      <Container className="menuHeight" fluid>
        <Row className="h-100 g-0">
          <Col className="h-100 overflow-auto">
            <Container>
              {/* <Container> */}
              <Stack gap={3} className="col-md-5 my-3">
                {/* <AddCategoryButton /> */}
              </Stack>
              {/* </Container> */}

              {orderData.orders.map((order, index) => (
                <div key={index}>
                  {
                    <Order
                      key={index}
                      orderId={order.id}
                      orderData={order}
                      isOrderActive={props.isOrderActive}
                    />
                  }
                </div>
              ))}
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

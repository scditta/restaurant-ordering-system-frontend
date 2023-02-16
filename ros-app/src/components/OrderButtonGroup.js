import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import api from '../API/posts';
export default function OrderButtonGroup(props) {
  //   const [order, setOrderButtonGroupData] = useState([]);
  //   const authUser = useContext(AuthenticationContext);
  const REDHEX = 'FF0000';
  const BLUEHEX = '0D6EFD';
  const [order, setOrderData] = useState(props.orderData);
  const [buttonState, setButtonState] = useState(props.orderData.state);

  //Fetch the order item and insert its data
  const handleClick = async (e) => {
    const textToValidState = {
      'NOT STARTED': 'NOT_STARTED',
      'IN PROGRESS': 'IN_PROGRESS',
      COMPLETED: 'COMPLETE',
    };
    try {
      //   console.log(orderId);
      const validState = textToValidState[e.target.innerText];
      const response = await api.put(`api/v1/orders/${props.orderId}`, {
        state: validState,
        payment_tax: props.orderData.payment_tax,
        payment_subtotal: props.orderData.payment_subtotal, //save as cents in db, NOT dollars
        payment_total: props.orderData.payment_total,
        items: props.orderData.items,
      });
      setButtonState(validState);
      props.updateOrder(response);
      console.log(response);
    } catch (err) {
      if (err.response) {
        //not in the 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        //response is undefined
        console.log(`Error: ${err.message}`);
      }
    }
  };
  return (
    <>
      <ButtonGroup className="mb-2" onClick={(e) => handleClick(e)}>
        <Button
          id={order.orderId}
          style={
            buttonState === 'NOT_STARTED'
              ? { backgroundColor: `#${REDHEX}` }
              : { backgroundColor: `#${BLUEHEX}` }
          }
        >
          NOT STARTED
        </Button>
        <Button
          id={order.orderId}
          style={
            buttonState === 'IN_PROGRESS'
              ? { backgroundColor: `#${REDHEX}` }
              : { backgroundColor: `#${BLUEHEX}` }
          }
        >
          IN PROGRESS
        </Button>
        <Button
          id={order.orderId}
          style={
            buttonState === 'COMPLETE'
              ? { backgroundColor: `#${REDHEX}` }
              : { backgroundColor: `#${BLUEHEX}` }
          }
        >
          COMPLETED
        </Button>
      </ButtonGroup>
    </>
  );
}

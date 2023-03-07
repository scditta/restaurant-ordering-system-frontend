import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import api from '../API/posts';
export default function OrderButtonGroup(props) {
  const REDHEX = '706b71';
  const BLUEHEX = 'bebbbe';
  const [buttonState, setButtonState] = useState(props.orderData.state);
  const handleClick = async (e) => {
    const textToValidState = {
      'NOT STARTED': 'NOT_STARTED',
      'IN PROGRESS': 'IN_PROGRESS',
      COMPLETED: 'COMPLETE',
    };
    try {
      //   console.log(orderId);
      const validState = textToValidState[e.target.innerText];
      const response = await api.put(`api/v1/orders/${props.orderData.id}`, {
        user: props.orderData.user,
        state: validState,
        payment_tax: props.orderData.payment_tax,
        payment_subtotal: props.orderData.payment_subtotal,
        payment_total: props.orderData.payment_total,
        items: props.orderData.items,
      });
      setButtonState(validState);
      props.updateOrderCallback(response.data);
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
    <div
      style={{
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        width: '100%',
        paddingRight: '32px',
      }}
    >
      <ButtonGroup className="mb-2" onClick={(e) => handleClick(e)} style={{ width: '80%' }}>
        <Button
          id={props.orderData.orderId}
          style={
            buttonState === 'NOT_STARTED'
              ? { backgroundColor: `#${REDHEX}`, borderColor: `#${BLUEHEX}` }
              : { backgroundColor: `#${BLUEHEX}`, borderColor: `#${BLUEHEX}` }
          }
        >
          NOT STARTED
        </Button>
        <Button
          id={props.orderData.orderId}
          style={
            buttonState === 'IN_PROGRESS'
              ? { backgroundColor: `#${REDHEX}`, borderColor: `#${BLUEHEX}` }
              : { backgroundColor: `#${BLUEHEX}`, borderColor: `#${BLUEHEX}` }
          }
        >
          IN PROGRESS
        </Button>
        <Button
          id={props.orderData.orderId}
          style={
            buttonState === 'COMPLETE'
              ? { backgroundColor: `#${REDHEX}`, borderColor: `#${BLUEHEX}` }
              : { backgroundColor: `#${BLUEHEX}`, borderColor: `#${BLUEHEX}` }
          }
        >
          COMPLETED
        </Button>
      </ButtonGroup>
    </div>
  );
}

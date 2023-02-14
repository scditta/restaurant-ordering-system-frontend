import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import AuthenticationContext from '../context/AuthenticationContext';
import api from '../API/posts';

export default function Order(props) {
  //   const [order, setOrderButtonGroupData] = useState([]);
  //   const authUser = useContext(AuthenticationContext);

  //Fetch the order item and insert its data

  const handleClick = async (e) => {
    const textToValidState = {
      'NOT STARTED': 'NOT_STARTED',
      'IN PROGRESS': 'IN_PROGRESS',
    };
    try {
      //   console.log(orderId);
      const response = await api.put(`api/v1/orders/${props.orderId}`, {
        state: textToValidState[e.target.innerText],
        payment_tax: props.orderData.payment_tax,
        payment_subtotal: props.orderData.payment_subtotal, //save as cents in db, NOT dollars
        payment_total: props.orderData.payment_total,
        items: props.orderData.items,
      });
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
    const element = document.querySelectorAll('#' + CSS.escape(e.target.id));
    console.log(element);
    if (e.target.innerText === 'NOT STARTED') {
      for (let i = 0; i < element.length; i++) {
        if (element[i].innerText !== 'NOT STARTED') {
          element[i].style.backgroundColor = '#0d6efd';
        }
      }
      e.target.style.backgroundColor = '#ff0000';
    } else if (e.target.innerText === 'IN PROGRESS') {
      e.target.style.backgroundColor = '#ff0000';
      for (let i = 0; i < element.length; i++) {
        if (element[i].innerText !== 'IN PROGRESS') {
          element[i].style.backgroundColor = '#0d6efd';
        }
      }
    } else {
      e.target.style.backgroundColor = '#ff0000';
      for (let i = 0; i < element.length; i++) {
        if (element[i].innerText !== 'COMPLETED') {
          element[i].style.backgroundColor = '#0d6efd';
        }
      }
    }
  };

  function renderBtnColor(orderId, state) {
    const dict = {
      NOT_STARTED: 'NOT STARTED',
      IN_PROGRESS: 'IN PROGRESS',
    };
    console.log(state);
    const element = document.querySelectorAll('#' + CSS.escape(orderId));
    console.log(element);
    for (let i = 0; i < element.length; i++) {
      if (element[i].innerText === 'NOT STARTED') {
        element[i].style.backgroundColor = '#ff0000';
      } else if (element[i].innerText === 'IN PROGRESS') {
        element[i].style.backgroundColor = '#FFFF00';
      }
    }
    return;
  }

  const handleChange = () => {};

  return (
    <>
      <ButtonGroup className="mb-2" onClick={(e) => handleClick(e)}>
        {props.orderData.state !== 'COMPLETED'
          ? renderBtnColor(props.orderId, props.orderData.state)
          : ''}
        <Button id={props.orderId}>NOT STARTED</Button>
        <Button id={props.orderId}>IN PROGRESS</Button>
        <Button id={props.orderId}>COMPLETED</Button>
      </ButtonGroup>
    </>
  );
}

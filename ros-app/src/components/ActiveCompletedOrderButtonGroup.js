import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OrderGrid from './OrderGrid';
export default function ActiveCompletedOrderButtonGroup() {
  //   const [order, setOrderButtonGroupData] = useState([]);
  //   const authUser = useContext(AuthenticationContext);
  const [showActiveOrder, setShowActiveOrder] = useState(true);

  //Fetch the order item and insert its data
  const handleClick = async (e) => {
    if (e.target.innerText === 'Active Orders') {
      setShowActiveOrder(true);
    } else if (e.target.innerText === 'Completed Orders') {
      setShowActiveOrder(false);
    }
  };

  return (
    <>
      <ButtonGroup className="mb-2" onClick={(e) => handleClick(e)}>
        <Button>Active Orders</Button>
        <Button>Completed Orders</Button>
      </ButtonGroup>
      <OrderGrid showActiveOrder={showActiveOrder}></OrderGrid>
    </>
  );
}

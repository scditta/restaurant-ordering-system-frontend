import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import OrderGrid from './OrderGrid';
export default function ActiveCompletedOrderButtonGroup() {
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
    <div>
      <div style={{ textAlign: 'center', paddingTop: '15px' }}>
        <ButtonGroup className="mb-2" onClick={(e) => handleClick(e)}>
          <Button>Active Orders</Button>
          <Button>Completed Orders</Button>
        </ButtonGroup>
      </div>
      <div style={{ textAlign: 'center', fontSize: 40 }}>
        <span>
          <b>{showActiveOrder ? 'Active Orders' : 'Completed Orders'}</b>
        </span>
      </div>

      <OrderGrid showActiveOrder={showActiveOrder}></OrderGrid>
    </div>
  );
}

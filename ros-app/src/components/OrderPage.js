import { OrderGridProvider } from '../context/OrderGridContext';
// import OrderGrid from '../components/OrderGrid';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ActiveCompletedOrderButtonGroup from './ActiveCompletedOrderButtonGroup';
export default function OrderPage() {
  return (
    <>
      <OrderGridProvider>
        <ActiveCompletedOrderButtonGroup></ActiveCompletedOrderButtonGroup>
      </OrderGridProvider>
    </>
  );
}

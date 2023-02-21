import { OrderGridProvider } from '../context/OrderGridContext';

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

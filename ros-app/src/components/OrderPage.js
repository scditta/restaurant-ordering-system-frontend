import { OrderGridProvider } from '../context/OrderGridContext';
import OrderGrid from '../components/OrderGrid';
export default function OrderPage() {
  return (
    <>
      <OrderGridProvider>
        <OrderGrid></OrderGrid>
      </OrderGridProvider>
    </>
  );
}

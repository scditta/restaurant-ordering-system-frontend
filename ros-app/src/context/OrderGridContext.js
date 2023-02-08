import { createContext, useState, useEffect } from 'react';
import api from '../API/posts';

//React Context
const OrderGridContext = createContext();

export function OrderGridProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    updateOrderGrid();
  }, []);

  //updates the menu by fetching the new categories and items
  const updateOrderGrid = () => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/v1/orders');
        // console.log(response.data);
        console.log('RESPONSE');
        console.log(response.data);
        setOrders(response.data);
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
    fetchOrders();
  };
  console.log(orders);
  return (
    <OrderGridContext.Provider value={{ orders, updateOrderGrid }}>
      {children}
    </OrderGridContext.Provider>
  );
}

export default OrderGridContext;

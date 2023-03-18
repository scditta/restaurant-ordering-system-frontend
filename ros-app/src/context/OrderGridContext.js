import { createContext, useState, useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import api from '../API/posts';

//React Context
const OrderGridContext = createContext();

export function OrderGridProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    updateOrderGrid();

    let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/sse/orders`;
    url = url.replace(/(?<!:)\/+/gm, '/'); //clean up double slashes in url
    const es = new EventSourcePolyfill(url, {
      headers: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    console.log(`Connected to SSE server.`);

    es.addEventListener('order', (event) => {
      const eventData = JSON.parse(event.data);

      switch (eventData.event) {
        case 'order-create':
          updateOrderGrid();
          break;
        default:
      }
    });

    return () => {
      es.close();
    };
  }, []);

  const updateOrderGrid = () => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/v1/orders');
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

  return (
    <OrderGridContext.Provider value={{ orders, updateOrderGrid }}>
      {children}
    </OrderGridContext.Provider>
  );
}

export default OrderGridContext;

import { createContext, useState, useEffect } from 'react';
import api from '../API/posts';

//React Context
const OrderCompletedContext = createContext();

export function OrderCompleteProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(new Date.now().toISOString());
  const [endDate, setEndDate] = useState(null);
  //   useEffect(() => {
  //     updateOrderComplete();
  //   }, []);

  const updateOrderComplete = () => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          `api/v1/orders?state=COMPLETE&min=${startDate.toLocaleDateString('en-CA')}T00:00:00&max=${
            endDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
          }`
        );
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

  //   useEffect(() => {
  //     if (startDate === null && endDate === null) {
  //       onClear();
  //     } else {
  //       api
  //         .get(
  //           `api/v1/orders?state=${orderState}&min=${startDate.toLocaleDateString(
  //             'en-CA'
  //           )}T00:00:00&max=${
  //             endDate != null
  //               ? endDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
  //               : startDate.toLocaleDateString('en-CA') + 'T23:59:59.999Z'
  //           }`
  //         )
  //         .then((resp) => {
  //           // console.log(resp.data);
  //           setOrders(resp.data);
  //         })
  //         .catch((err) => {
  //           if (err.response) {
  //             //not in the 200 range
  //             console.log(err.response.data);
  //             console.log(err.response.status);
  //             console.log(err.response.headers);
  //           } else {
  //             //response is undefined
  //             console.log(`Error: ${err.message}`);
  //           }
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     }
  //   }, [startDate, endDate]);

  return (
    <OrderCompletedContext.Provider value={{ orders, updateOrderComplete }}>
      {children}
    </OrderCompletedContext.Provider>
  );
}

export default OrderCompletedContext;

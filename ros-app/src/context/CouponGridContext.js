import { createContext, useState, useEffect } from 'react';
import api from '../API/posts';

//React Context
const CouponGridContext = createContext();

export function CouponGridProvider({ children }) {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    updateCouponGrid();
  }, []);

  //updates the menu by fetching the new categories and items
  const updateCouponGrid = () => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get('api/v1/coupons');
        // console.log(response.data);
        setCoupons(response.data);
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
    fetchCoupons();
  };

  return (
    <CouponGridContext.Provider value={{ coupons, updateCouponGrid }}>
      {children}
    </CouponGridContext.Provider>
  );
}

export default CouponGridContext;

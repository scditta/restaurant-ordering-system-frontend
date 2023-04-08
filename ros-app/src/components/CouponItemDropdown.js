import { useContext, useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import CouponGridContext from '../context/CouponGridContext';
// import Coupon from './Coupon.js';
import api from '../API/posts';
export default function CouponItemDropdown() {
  const [itemArr, setItemArr] = useState([]);
  useEffect(() => {
    updateItem();
  });

  //Fetch the item and insert its data
  const updateItem = async () => {
    try {
      const response = await api.get(`api/v1/items`);
      setItemArr(response.data);
      //   console.log(response.data);
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
  //   console.log(itemArr);
  return (
    <>
      {itemArr.map((item, index) => (
        // <div key={index}>
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </>
  );
}

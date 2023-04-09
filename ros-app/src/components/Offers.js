import { useState, useEffect } from 'react';

import api from '../API/posts';

const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export default function Offers() {
  const [coupons, setCoupons] = useState([]);

  const getItem = async (id) => {
    try {
      const response = await api.get(`api/v1/items/${id}`);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      return false;
    }
  };

  useEffect(() => {
    const getCoupons = () => {
      api
        .get(`api/v1/coupons`)
        .then(async (response) => {
          const currentCoupons = [];
          const date = new Date();
          const dayOfWeek = WEEKDAYS[date.getDay()];

          for (const coupon of response.data) {
            if (coupon.availability.includes(dayOfWeek)) {
              const foundItem = await getItem(coupon.item);

              if (foundItem) {
                coupon.item = foundItem;
                currentCoupons.push(coupon);
              }
            }
          }

          setCoupons(currentCoupons);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        });
    };
    getCoupons();
  }, []);

  return (
    <>
      <h1>Offers</h1>(
      {coupons.map((coupon) => (
        <span>{coupon.code}</span>
      ))}
      )
    </>
  );
}

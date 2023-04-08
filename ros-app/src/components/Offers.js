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

  const getCoupons = () => {
    api
      .get(`api/v1/coupons`)
      .then((response) => {
        const currentCoupons = [];
        const date = new Date();
        const dayOfWeek = WEEKDAYS[date.getDay()];

        response.data.forEach((coupon) => {
          if (coupon.availability.includes(dayOfWeek)) {
            //await getItem(coupon.item);

            currentCoupons.push(coupon);
          }
        });

        console.log(`Current day of the week is: ${dayOfWeek}`);
        console.log(`Available coupons:`);
        currentCoupons.forEach((e) => {
          console.log(e);
        });

        //setCoupons(currentCoupons);
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

  useEffect(() => {
    console.log('test');
    getCoupons();
  });

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

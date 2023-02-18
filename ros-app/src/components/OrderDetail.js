import { useEffect, useState } from 'react';

import api from '../API/posts';

export default function OrderDetail(props) {
  const [item, setItem] = useState([]);

  // useEffect(() => {
  //   console.log(props.itemId);
  // });

  useEffect(() => {
    // console.log('itemEffect');
    api
      .get(`api/v1/items/${props.itemId}`)
      .then((resp) => {
        // console.log(resp.data);
        setItem(resp.data);
      })
      .catch((err) => {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      });
  }, [props.itemId]);

  return (
    <>
      <p>{item.name}</p>
      <p>{item.price}</p>
    </>
  );
}

import { useEffect, useContext } from 'react';

import MenuContext from '../context/MenuContext';

import api from '../API/posts';

export default function Icon(props) {
  const menuData = useContext(MenuContext);

  useEffect(() => {
    // console.log(menuData);
  }, []);

  function removeCategory(e) {
    e.preventDefault();

    if (props.type === 'category') {
      const deleteCategory = async () => {
        try {
          const response = await api.delete(`/api/v1/categories/${props.categoryId}`);
          console.log(response.data);
          menuData.updateMenu();
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
      deleteCategory();
    } else {
      const deleteItem = async () => {
        try {
          const response = await api.delete(`/api/v1/items/${props.itemId}/${props.categoryId}`);
          console.log(response.data);
          menuData.updateMenu();
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
      deleteItem();
    }
  }

  return (
    <>
      <svg
        onClick={removeCategory}
        xmlns={props.icon}
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash3"
        viewBox="0 0 16 16"
      >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
      </svg>
    </>
  );
}

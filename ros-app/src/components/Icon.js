import { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';

import MenuContext from '../context/MenuContext';

import api from '../API/posts';

export default function Icon(props) {
  const menuData = useContext(MenuContext);

  useEffect(() => {
    // console.log(menuData);
  }, []);

  function removeCategory(e) {
    // e.preventDefault();
    // console.log('test');
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
      <Button variant="danger" type="button" onClick={() => removeCategory()}>
        <svg
          xmlns={props.icon}
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </Button>
    </>
  );
}

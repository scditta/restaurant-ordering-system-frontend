import { createContext, useState, useEffect } from 'react';
import api from '../API/posts';

//React Context
const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateMenu();
  }, []);

  //updates the menu by fetching the new categories and items
  const updateMenu = () => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/v1/categories');
        // console.log(response.data);
        setCategories(response.data);
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
    fetchCategories();
  };

  return <MenuContext.Provider value={{ categories, updateMenu }}>{children}</MenuContext.Provider>;
}

export default MenuContext;

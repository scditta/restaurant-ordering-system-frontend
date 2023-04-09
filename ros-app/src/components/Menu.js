import { useContext, useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import api from '../API/posts';

import Item from './Item';
import Category from './Category';
import AddCategoryButton from './AddCategoryButton';
import AddItemButton from './AddItemButton';
import Cart from './Cart';
import Offers from './Offers';

import AuthenticationContext from '../context/AuthenticationContext';
import MenuContext from '../context/MenuContext';

export default function Menu(props) {
  const menuData = useContext(MenuContext);
  const authUser = useContext(AuthenticationContext);

  let cartCached = localStorage.getItem('cart');
  let defaultCart = useMemo(() => {
    return {};
  }, []);
  if (cartCached) defaultCart = JSON.parse(cartCached);

  const [cart, setCart] = useState(defaultCart);

  const addCart = (id, qty, name, price) => {
    const updatedCart = { ...cart };
    if (id in updatedCart) {
      updatedCart[id].qty += qty;
    } else {
      updatedCart[id] = { qty: qty };
    }
    updatedCart[id].name = name;
    updatedCart[id].price = price;
    updateCart(updatedCart);
  };

  const removeCart = (id) => {
    const updatedCart = { ...cart };
    delete updatedCart[id];
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart({});
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    if (props.reorder !== null) {
      for (let i = 0; i < props.reorder.items.length; i++) {
        api
          .get(`api/v1/items/${props.reorder.items[i].item}`)
          .then((resp) => {
            defaultCart[resp.data.id] = { qty: props.reorder.items[i].qty };
            defaultCart[resp.data.id].name = resp.data.name;
            defaultCart[resp.data.id].price = resp.data.price;

            setCart({ ...cart });
            console.log(cart);
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
      }
      console.log(cart);
      // updateCart(cart.defaultCart);
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reorder]);

  return (
    <Container>
      <Row className="pt-3">
        <Col md={8}>
          {!authUser.authorization ? <Offers /> : <></>}
          <AddCategoryButton />
          {menuData.categories?.map((category, index) => (
            <div key={index}>
              <Category categoryId={category.id} categoryName={category.name} />
              {category?.items.map((item, index) => (
                <Item
                  key={index}
                  itemId={item}
                  categoryId={category.id}
                  addCartCallback={addCart}
                />
              ))}
              {authUser.authorization && <AddItemButton categoryId={category.id} />}
            </div>
          ))}
        </Col>
        <Col md={4} className="ml-4">
          {!authUser.authorization ? (
            <Cart cart={cart} removeCartCallback={removeCart} clearCartCallback={clearCart} />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}

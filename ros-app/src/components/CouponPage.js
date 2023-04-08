import { CouponGridProvider } from '../context/CouponGridContext';
import { CouponGrid } from './CouponGrid.js';
import { AddCouponButton } from './AddCouponButton';
export default function CouponPage() {
  return (
    <>
      <CouponGridProvider>
        <AddCouponButton></AddCouponButton>
        <CouponGrid></CouponGrid>
      </CouponGridProvider>
    </>
  );
}
// import { useContext, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// import Item from './Item';
// import Category from './Category';
// import AddCategoryButton from './AddCategoryButton';
// import AddItemButton from './AddItemButton';
// import Cart from './Cart';

// import AuthenticationContext from '../context/AuthenticationContext';
// import MenuContext from '../context/MenuContext';

// export default function Menu() {
//   const menuData = useContext(MenuContext);
//   const authUser = useContext(AuthenticationContext);

//   let cartCached = localStorage.getItem('cart');
//   let defaultCart = {};
//   if (cartCached) defaultCart = JSON.parse(cartCached);

//   const [cart, setCart] = useState(defaultCart);

//   const addCart = (id, qty, name, price) => {
//     const updatedCart = { ...cart };
//     if (id in updatedCart) {
//       updatedCart[id].qty += qty;
//     } else {
//       updatedCart[id] = { qty: qty };
//     }
//     updatedCart[id].name = name;
//     updatedCart[id].price = price;
//     updateCart(updatedCart);
//   };

//   const removeCart = (id) => {
//     const updatedCart = { ...cart };
//     delete updatedCart[id];
//     updateCart(updatedCart);
//   };

//   const clearCart = () => {
//     updateCart({});
//   };

//   const updateCart = (updatedCart) => {
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setCart(updatedCart);
//   };

//   return (
//     <Container>
//       <Row className="pt-3">
//         <Col md={8}>
//           <AddCategoryButton />
//           {menuData.categories?.map((category, index) => (
//             <div key={index}>
//               <Category categoryId={category.id} categoryName={category.name} />
//               {category?.items.map((item, index) => (
//                 <Item
//                   key={index}
//                   itemId={item}
//                   categoryId={category.id}
//                   addCartCallback={addCart}
//                 />
//               ))}
//               {authUser.authorization && <AddItemButton categoryId={category.id} />}
//             </div>
//           ))}
//         </Col>
//         <Col md={4} className="ml-4">
//           {!authUser.authorization ? (
//             <Cart cart={cart} removeCartCallback={removeCart} clearCartCallback={clearCart} />
//           ) : (
//             <></>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

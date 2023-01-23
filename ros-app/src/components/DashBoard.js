import NavBar from './NavBar';
import Menu from './Menu';

import { MenuProvider } from '../context/MenuContext';

export default function DashBoard() {
  return (
    <>
      {/* NavBar Component */}
      <NavBar />
      <MenuProvider>
        {/* Content */}
        <Menu />
      </MenuProvider>
    </>
  );
}

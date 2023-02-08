import Menu from './Menu';

import { MenuProvider } from '../context/MenuContext';

export default function DashBoard() {
  return (
    <>
      {/* NavBar Component */}
      <MenuProvider>
        {/* Content */}
        <Menu />
      </MenuProvider>
    </>
  );
}

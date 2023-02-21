import Menu from './Menu';

import { MenuProvider } from '../context/MenuContext';

export default function DashBoard() {
  return (
    <>
      <MenuProvider>
        {/* Content */}
        <Menu />
      </MenuProvider>
    </>
  );
}

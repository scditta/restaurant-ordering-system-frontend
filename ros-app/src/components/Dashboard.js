import { MenuProvider } from '../context/MenuContext';
import Menu from '../components/Menu';
export default function Dashboard() {
  return (
    <>
      <MenuProvider>
        <Menu></Menu>
      </MenuProvider>
    </>
  );
}

import Menu from './Menu';
import { MenuProvider } from '../context/MenuContext';
import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// import api from '../API/posts';

export default function DashBoard() {
  const { state } = useLocation();

  return (
    <>
      <MenuProvider>
        {/* Content */}
        <Menu reorder={state} />
      </MenuProvider>
    </>
  );
}

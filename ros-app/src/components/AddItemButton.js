import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';

export default function AddItemButton() {
  const authUser = useContext(AuthenticationContext);
  return (
    <>
      {authUser.authorization ? (
        <Button variant="primary" type="button">
          + Add Item
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';

export default function AddCategoryButton() {
  const authUser = useContext(AuthenticationContext);
  return (
    <>
      {authUser.authorization ? (
        <Button variant="primary" type="button">
          + Add Category
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

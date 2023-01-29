import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

import MenuContext from '../context/MenuContext';

import api from '../API/posts';

//Imported Icon
import { XSquare } from 'react-bootstrap-icons';

export default function DeleteCategory(props) {
  const menuData = useContext(MenuContext);

  const [modalShow, setModalShow] = useState(false);

  function DeleteCategoryModal() {
    return (
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Delete {props.categoryName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete <b>{props.categoryName}</b>?<br></br>
            <br></br>This will permanently remove this category and all items assocated to it.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => removeCategory()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function removeCategory(e) {
    const deleteCategory = async () => {
      try {
        const response = await api.delete(`/api/v1/categories/${props.categoryId}`);
        console.log(response.data);
        menuData.updateMenu();
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
    deleteCategory();
  }

  return (
    <>
      <Button variant="danger" type="button" onClick={() => setModalShow(true)}>
        <XSquare width={20} height={20} />
      </Button>
      <DeleteCategoryModal />
    </>
  );
}

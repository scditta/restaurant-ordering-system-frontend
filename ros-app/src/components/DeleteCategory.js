import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

import MenuContext from '../context/MenuContext';

import api from '../API/posts';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </Button>
      <DeleteCategoryModal />
    </>
  );
}

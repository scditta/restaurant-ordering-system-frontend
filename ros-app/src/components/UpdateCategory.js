import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';
import MenuContext from '../context/MenuContext';

import api from '../API/posts';

export default function UpdateCategory(props) {
  const authUser = useContext(AuthenticationContext);
  const menuData = useContext(MenuContext);

  const [modalShow, setModalShow] = useState(false);

  function UpdateCategoryModal() {
    const NAME_MAX = 40;

    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [valid, setValid] = useState(false);

    function handleSubmit() {
      // console.log(categoryName);
      // console.log(props.categoryId);
      const updateCategory = async () => {
        for (let i = 0; i < menuData.categories.length; i++) {
          // console.log();
          if (menuData.categories[i].id === props.categoryId) {
            // console.log(menuData.categories[i].items);
            try {
              const response = await api.put(`api/v1/categories/${props.categoryId}`, {
                name: categoryName,
                items: menuData.categories[i].items,
              });
              console.log(response.data);
              menuData.updateMenu();
              setModalShow(false);
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
          }
        }
      };
      updateCategory();
    }

    function handleChange(e) {
      const value = e.target.value;
      setCategoryName(value);
      if (value.length > 0 && value !== props.categoryName) {
        setValid(true);
      } else {
        setValid(false);
      }
    }

    useEffect(() => {
      setValid(false);
    }, []);

    return (
      <>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            <Form.Group className="mb-3 px-5">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Name"
                name="categoryName"
                value={categoryName}
                onChange={handleChange}
                maxLength={NAME_MAX}
              ></Form.Control>
              <Form.Text className={categoryName.length < NAME_MAX ? 'text-muted' : 'text-danger'}>
                {NAME_MAX - categoryName.length} character(s) remaining
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            {valid ? (
              <Button variant="primary" onClick={handleSubmit}>
                Update Category
              </Button>
            ) : (
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Please change category name</Tooltip>}
              >
                <span className="d-inline-block">
                  <Button disabled style={{ pointerEvents: 'none' }}>
                    Update Category
                  </Button>
                </span>
              </OverlayTrigger>
              // <Button variant="primary" onClick={handleSubmit} disabled>
              //   Save New Category
              // </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      {authUser.authorization ? (
        <Button variant="secondary" type="button" onClick={() => setModalShow(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 18"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </Button>
      ) : (
        <></>
      )}
      <UpdateCategoryModal />
    </>
  );
}

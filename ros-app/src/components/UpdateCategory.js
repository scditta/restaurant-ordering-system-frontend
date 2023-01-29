import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';
import MenuContext from '../context/MenuContext';

import api from '../API/posts';

//Imported Icon
import { PencilSquare } from 'react-bootstrap-icons';

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
          <PencilSquare width={20} height={20} />
        </Button>
      ) : (
        <></>
      )}
      <UpdateCategoryModal />
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

import AuthenticationContext from '../context/AuthenticationContext';
import MenuContext from '../context/MenuContext';

import api from '../API/posts';

export default function AddCategoryButton() {
  const authUser = useContext(AuthenticationContext);
  const menuData = useContext(MenuContext);

  const [modalShow, setModalShow] = useState(false);

  function CreateCategoryModal() {
    const NAME_MAX = 40;

    const [categoryName, setCategoryName] = useState('');
    const [valid, setValid] = useState(false);

    function handleSubmit() {
      // console.log(categoryName);
      const createCategory = async () => {
        try {
          const response = await api.post('/api/v1/categories', { name: categoryName, items: [] });
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
      };
      createCategory();
    }

    function handleChange(e) {
      const value = e.target.value;
      setCategoryName(value);
      if (value.length > 0) {
        setValid(true);
      } else {
        setValid(false);
      }
    }

    useEffect(() => {
      // console.log('testing');
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
            <Modal.Title id="contained-modal-title-vcenter">Add a Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            <Form.Group className="mb-3 px-5">
              <Form.Label>Category Name</Form.Label>
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
                Save New Category
              </Button>
            ) : (
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Please fill out category name</Tooltip>}
              >
                <span className="d-inline-block">
                  <Button disabled style={{ pointerEvents: 'none' }}>
                    Add New Category
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
        <Button variant="primary" type="button" onClick={() => setModalShow(true)}>
          + Add Category
        </Button>
      ) : (
        <></>
      )}
      <CreateCategoryModal />
    </>
  );
}

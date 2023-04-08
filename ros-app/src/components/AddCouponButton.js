import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import ItemDropdownOption from './CouponItemDropdown';
import AuthenticationContext from '../context/AuthenticationContext';
import CouponGridContext from '../context/CouponGridContext';

import api from '../API/posts';

export function AddCouponButton() {
  const authUser = useContext(AuthenticationContext);
  const couponData = useContext(CouponGridContext);

  const [modalShow, setModalShow] = useState(false);

  function CreateCouponModal() {
    const NAME_MAX = 40;

    // const [couponCode, setCouponCode] = useState('');
    // const [itemId, setItemId] = useState(0);
    // const [discount, setDiscount] = useState('');
    const [formValue, setFormValue] = useState({
      item: '',
      discount_percent: '',
      code: '',
      availability: '',
    });
    const [isValid, setIsValid] = useState(false);

    async function handleSubmit() {
      console.log('start');
      const data = getValidForm(formValue);
      try {
        console.log('RESPONSE.data');
        console.log(formValue);
        const response = await api.post('api/v1/coupons', data);
        console.log('RESPONSE.data');
        console.log(formValue);
        console.log(response.data);
        couponData.updateCouponGrid();
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

    function getValidForm(formValue) {
      const request = {};
      request.item = formValue.item;
      request.discount_percent = +formValue.discount_percent / 100;
      request.code = formValue.code;

      const splitString = formValue.availability.split(',');
      const availibilityList = splitString.map((item) => {
        return item;
      });
      request.availability = availibilityList;

      console.log('test');
      console.log(request);

      return JSON.stringify(request);
    }

    function handleChange(e) {
      const { name, value } = e.target;
      setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
      if (value.length >= 4) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
    // console.log(couponData);
    // useEffect(() => {
    //   setIsValid(false);
    // }, []);

    return (
      <>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Add a Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-5">
            <Form.Group className="mb-3 px-5">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Coupon Code"
                name="code"
                onChange={handleChange}
                maxLength={NAME_MAX}
              ></Form.Control>
              <Form.Text
                className={formValue.code.length < NAME_MAX ? 'text-muted' : 'text-danger'}
              >
                {NAME_MAX - formValue.code.length} character(s) remaining
              </Form.Text>
            </Form.Group>
            <Form.Group>
              {' '}
              <Form.Label>Select an item to discount</Form.Label>
              <Form.Select placeholder="Discounted Item" name="item" onChange={handleChange}>
                <ItemDropdownOption></ItemDropdownOption>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
              <Form.Label>Discount Percent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount Percent"
                name="discount_percent"
                onChange={handleChange}
                maxLength={NAME_MAX}
              ></Form.Control>
              <Form.Text
                className={
                  formValue.discount_percent.length < NAME_MAX ? 'text-muted' : 'text-danger'
                }
              >
                {NAME_MAX - formValue.discount_percent.length} character(s) remaining
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                placeholder="Availability"
                name="availability"
                onChange={handleChange}
                maxLength={NAME_MAX}
              ></Form.Control>
              <Form.Text
                className={formValue.availability.length < NAME_MAX ? 'text-muted' : 'text-danger'}
              >
                {NAME_MAX - formValue.availability.length} character(s) remaining
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cancel
            </Button>
            {isValid ? (
              <Button variant="primary" onClick={handleSubmit}>
                Save New Coupon
              </Button>
            ) : (
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Please fill out coupon</Tooltip>}
              >
                <span className="d-inline-block">
                  <Button style={{ pointerEvents: 'none' }} disabled={!isValid}>
                    <>Add New Coupon</>
                  </Button>
                </span>
              </OverlayTrigger>
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
          + Add Coupon
        </Button>
      ) : (
        <></>
      )}
      <CreateCouponModal />
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import AuthenticationContext from '../context/AuthenticationContext';
import CouponGridContext from '../context/CouponGridContext';

import api from '../API/posts';

export function AddCouponButton() {
  const authUser = useContext(AuthenticationContext);
  const couponData = useContext(CouponGridContext);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [modalShow, setModalShow] = useState(false);

  function CreateCouponModal() {
    const NAME_MAX = 40;
    const [formValue, setFormValue] = useState({
      item: '',
      discount_percent: 0,
      code: '',
      availability: [],
    });
    const [isValid, setIsValid] = useState(false);
    const [itemArr, setItemArr] = useState([]);
    //Fetch all items
    const updateItems = async () => {
      try {
        const response = await api.get(`api/v1/items`);
        setItemArr(response.data);
        //   console.log(response.data);
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

    useEffect(() => {
      updateItems();
      console.log(formValue.item);
      setIsValid(
        formValue.item !== '' && formValue.code.length > 0 && formValue.availability.length > 0
      );
    }, [formValue]);

    async function handleSubmit() {
      console.log('start');
      const data = getValidForm(formValue);
      try {
        await api.post('api/v1/coupons', data);
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
      request.discount_percent = +formValue.discount_percent;
      request.code = formValue.code;
      request.availability = formValue.availability;
      return JSON.stringify(request);
    }

    function handleChange(e) {
      const name = e.target.name;
      const value = e.target.value;
      if (name !== 'availability') {
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      } else {
        if (!formValue.availability.includes(value)) {
          setFormValue((oldArray) => {
            return {
              ...oldArray,
              [name]: [...oldArray.availability, value],
            };
          });
        } else {
          setFormValue((oldArray) => {
            return {
              ...oldArray,
              [name]: formValue.availability.filter((coupon) => coupon !== value),
            };
          });
        }
      }
    }

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
                placeholder="Name of Coupon Code"
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
            <Form.Group className="mb-3 px-5">
              <Form.Label>Select an item for the coupon</Form.Label>
              <Form.Select name="item" onChange={handleChange}>
                <option value="">-- Choose an item to select --</option>
                {itemArr.map((item, index) => (
                  // <div key={index}>
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
              <Form.Label>Discount Percent</Form.Label>
              <Form.Select defaultValue={5} name="discount_percent" onChange={handleChange}>
                <option value="5">5 %</option>
                <option value="10">10 %</option>
                <option value="15">15 %</option>
                <option value="20">20 %</option>
                <option value="25">25 %</option>
                <option value="30">30 %</option>
                <option value="35">35 %</option>
                <option value="40">40 %</option>
                <option value="45">45 %</option>
                <option value="50">50 %</option>
                <option value="55">55 %</option>
                <option value="60">60 %</option>
                <option value="65">65 %</option>
                <option value="70">70 %</option>
                <option value="75">75 %</option>
                <option value="80">80 %</option>
                <option value="85">85 %</option>
                <option value="90">90 %</option>
                <option value="95">95 %</option>
                <option value="100">100 %</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 px-5">
              <Form.Label>Availability</Form.Label>
              {days.map((day, index) => (
                <Form.Check
                  key={index}
                  label={day}
                  type="checkbox"
                  name="availability"
                  value={day.toUpperCase()}
                  onChange={handleChange}
                ></Form.Check>
              ))}
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

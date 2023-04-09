import { useState } from 'react';
import { Card, Button, Modal, Alert, Form, InputGroup } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { currency } from '../helpers/currency';
import GooglePayButton from '@google-pay/button-react';
import api from '../API/posts';

export default function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [payComplete, setPayComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('XXXX');
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState(null);
  const [payError, setPayError] = useState(false);

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setEnteredCode(value);
  };

  const applyCode = (e) => {
    let formattedCode = String(enteredCode.toUpperCase());
    props.addCouponCallback(formattedCode);

    setEnteredCode('');
    e.preventDefault();
  };

  const hideCheckout = () => {
    setPayComplete(false);
    setShowCheckout(false);
  };

  const cartEntryIds = Object.keys(props.cart);
  const cartEntries = props.cart;

  let subtotal = 0;
  let discount = 0;
  const cartItems = cartEntryIds.map((id) => {
    const cartItem = cartEntries[id];
    const discountedItem = props.activeCoupon && props.activeCoupon.item === id;

    const itemSubtotal = cartItem.price * cartItem.qty;

    let itemDiscount = 0;
    if (discountedItem) {
      itemDiscount = cartItem.price * cartItem.qty * (props.activeCoupon.discount_percent / 100);
    }
    subtotal += itemSubtotal;
    discount += itemDiscount;

    return (
      <Card key={id} className="mb-2">
        <Card.Body>
          <span>
            {cartItem.name} x{cartItem.qty}
          </span>
          <span className="float-end">
            {discountedItem ? (
              <>
                <s>{currency(itemSubtotal)}</s>&nbsp;
                <b>{currency(itemSubtotal - itemDiscount)}</b>
              </>
            ) : (
              currency(itemSubtotal)
            )}
            <XCircleFill
              size={24}
              style={{ marginLeft: '1em', cursor: 'pointer' }}
              onClick={() => {
                props.removeCartCallback(id);
              }}
            ></XCircleFill>
          </span>
        </Card.Body>
      </Card>
    );
  });

  const orderItems = cartEntryIds.map((id) => {
    const cartItem = cartEntries[id];

    return (
      <div key={id}>
        <span>
          {cartItem.name} (x{cartItem.qty})
        </span>
        <span className="float-end">{currency(cartItem.price * cartItem.qty)}</span>
      </div>
    );
  });

  const tax = Math.ceil((subtotal - discount) * 0.13);
  const total = subtotal - discount + tax;

  const subtotalFormatted = currency(subtotal);
  const discountFormatted = currency(discount);
  const taxFormatted = currency(tax);
  const totalFormatted = currency(total);

  const handlePaymentSuccess = async () => {
    setError(null);
    const orderItems = [];

    cartEntryIds.forEach((id) => {
      orderItems.push({ item: id, qty: cartEntries[id].qty });
    });

    await api
      .post(`api/v1/orders/`, {
        user: localStorage.getItem('user_id'),
        state: 'NOT_STARTED',
        payment_token: null, //unused
        payment_tax: tax,
        payment_subtotal: subtotal,
        payment_discount: discount,
        payment_total: total,
        items: orderItems,
      })
      .then((res) => {
        setOrderNumber(res.data.pin);
        setPayComplete(true);
        props.clearCartCallback();
      })
      .catch((err) => {
        setError(`An unexpected error occured. Please contact site administrator.`);
        console.error(err.response.data.error);
      });
  };

  return (
    <>
      <Card style={{ position: 'sticky', top: '1em' }}>
        <Card.Body>
          <Card.Title>Cart</Card.Title>
          <div style={{ minHeight: '30vh' }}>{cartItems}</div>
          <Form onSubmit={applyCode}>
            <InputGroup className="mb-3">
              <Form.Control
                value={enteredCode}
                onChange={handleCodeChange}
                placeholder="Enter Promo Code"
                aria-label="Enter Promo Code"
              />
              <Button type="submit" variant="secondary">
                Apply
              </Button>
            </InputGroup>
          </Form>
          <div>
            Subtotal:
            <span className="float-end">{subtotalFormatted}</span>
          </div>
          {props.activeCoupon ? (
            <div>
              Promo: <b>{props.activeCoupon.code}</b>
              <XCircleFill
                size={20}
                style={{
                  marginLeft: '0.5em',
                  cursor: 'pointer',
                  transform: 'translate(0px, -1px)',
                }}
                onClick={() => {
                  props.clearCouponCallback();
                }}
              ></XCircleFill>
              <span className="float-end">{discountFormatted}</span>
            </div>
          ) : (
            <></>
          )}
          <div>
            Tax:
            <span className="float-end">{taxFormatted}</span>
          </div>
          <hr className="mt-2 mb-2"></hr>
          <div style={{ fontWeight: 'bold' }}>
            Total:
            <span className="float-end">{totalFormatted}</span>
          </div>
          <div className="d-grid gap-2 mt-2">
            <Button
              onClick={() => {
                setError(null);
                setShowCheckout(true);
                setPayError(false);
              }}
              disabled={cartEntryIds.length === 0}
            >
              Checkout
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showCheckout} onHide={hideCheckout} animation={false} size="sm" centered>
        {payError && payComplete ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Payment Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>An error occured during the transaction.</div>
            </Modal.Body>
          </>
        ) : payComplete ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Order Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 style={{ display: 'flex', justifyContent: 'center' }}>Your order number is</h5>
              <h1
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  marginBottom: '1rem',
                }}
              >
                {orderNumber}
              </h1>
              <div>Please retain this order number for when your order is complete.</div>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Order Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">{orderItems}</div>
              <hr className="mt-2 mb-2"></hr>
              <div>
                Subtotal:
                <span className="float-end">{subtotalFormatted}</span>
              </div>
              <div>
                Discount:
                <span className="float-end">{discountFormatted}</span>
              </div>
              <div>
                Tax:
                <span className="float-end">{taxFormatted}</span>
              </div>
              <hr className="mt-2 mb-2"></hr>
              <div style={{ fontWeight: 'bold' }} className="mb-4">
                Total:
                <span className="float-end">{totalFormatted}</span>
              </div>

              <div>{error ? <Alert variant="danger">{error}</Alert> : null}</div>

              <GooglePayButton
                environment="TEST"
                buttonType="checkout"
                buttonSizeMode="fill"
                style={{ width: '100%' }}
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: 'CARD',
                      parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                      },
                      tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                          gateway: 'example',
                          gatewayMerchantId: 'exampleGatewayMerchantId',
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                  },
                  transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'CAD',
                    countryCode: 'CA',
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  if (payError) {
                    setPayComplete(true);
                  } else {
                    handlePaymentSuccess();
                  }
                }}
              />

              <div className="d-grid gap-2 mt-2">
                <Button
                  variant="secondary"
                  onClick={hideCheckout}
                  style={{ height: '48px', borderRadius: '3rem' }}
                >
                  Cancel
                </Button>
              </div>

              <Form style={{ marginTop: '2em' }}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Simulate Transaction Error"
                  value={payError}
                  onChange={() => {
                    setPayError(!payError);
                  }}
                />
              </Form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import GooglePayButton from '@google-pay/button-react';
import api from '../API/posts';

export default function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const hideCheckout = () => setShowCheckout(false);

  const cartEntryIds = Object.keys(props.cart);
  const cartEntries = props.cart;

  const formatCurrency = (cents) =>
    (cents / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' });

  let subtotal = 0;
  const cartItems = cartEntryIds.map((id) => {
    const cartItem = cartEntries[id];
    subtotal += cartItem.price * cartItem.qty;

    return (
      <Card key={id} className="mb-2">
        <Card.Body>
          <span>{cartItem.name}</span>
          <span className="float-end">
            Qty: {cartItem.qty}
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
        <span className="float-end">{formatCurrency(cartItem.price * cartItem.qty)}</span>
      </div>
    );
  });

  const tax = Math.ceil(subtotal * 0.13);
  const total = subtotal + tax;

  const subtotalFormatted = formatCurrency(subtotal);
  const taxFormatted = formatCurrency(tax);
  const totalFormatted = formatCurrency(total);

  const handlePaymentSuccess = async () => {
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
        payment_total: total,
        items: orderItems,
      })
      .then((res) => {
        setPaySuccess(true);
        props.clearCartCallback();
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <Card style={{ position: 'sticky', top: '1em' }}>
        <Card.Body>
          <Card.Title>Cart</Card.Title>
          <div style={{ minHeight: '30vh' }}>{cartItems}</div>

          <div>
            Subtotal:
            <span className="float-end">{subtotalFormatted}</span>
          </div>
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
            <Button onClick={setShowCheckout} disabled={cartEntryIds.length === 0}>
              Checkout
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showCheckout} onHide={hideCheckout} animation={false} size="sm" centered>
        {paySuccess ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Order Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Success</Modal.Body>
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
                Tax:
                <span className="float-end">{taxFormatted}</span>
              </div>
              <hr className="mt-2 mb-2"></hr>
              <div style={{ fontWeight: 'bold' }} className="mb-4">
                Total:
                <span className="float-end">{totalFormatted}</span>
              </div>

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
                  handlePaymentSuccess();
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
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

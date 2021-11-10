import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import CartPage from "../CartPage";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import OrderPage from "../OrderPage";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className='checkoutStep'>
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className='stepNumber'>{props.stepNumber}</span>
          <span className='stepTitle'>{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableEditAddrressForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className='flexRow addressContainer'>
      <div>
        <input name='address' type='radio' onClick={() => selectAddress(adr)} />
      </div>
      <div className='flexRow sb addressinfo'>
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className='addressDetail'>
              <div>
                <span className='addressName'>{adr.name}</span>
                <span className='addressType'>{adr.addressType}</span>
                <span className='addressMobileNumber'>{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name={"EDIT"}
                  onClick={() => enableEditAddrressForm(adr)}
                  style={{ fontWeight: "500" }}
                />
              )}
            </div>
            <div className='fullAddress'>
              {adr.address} <br />
              {""}
              {`${adr.state} - ${adr.pinCode}`}
            </div>

            {adr.selected && (
              <MaterialButton
                onClick={() => confirmDeliveryAddress(adr)}
                title='DELIVERY HERE'
                style={{ width: "200px", margin: "10px 0" }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [orderSumary, setOrderSumary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const onAddressSubmit = (addr) => {
    setselectedAddress(addr);
    setConfirmAddress(true);
    setOrderSumary(true);
  };
  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const selectAddress = (addr) => {
    const updatedAddress = address.map((item) => {
      if (item._id === addr._id) {
        return { ...item, selected: true };
      } else return { ...item, selected: false };
    });
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setConfirmAddress(true);
    setselectedAddress(addr);
    setOrderSumary(true);
  };

  const enableEditAddrressForm = (addr) => {
    const updatedAddress = address.map((item) => {
      if (item._id === addr._id) {
        return { ...item, edit: true };
      } else return { ...item, edit: false };
    });
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderSumary(false);
    setOrderConfirmation(true);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (toltalPrice, key) => {
        const { qty, price } = cart.cartItems[key];
        return toltalPrice + qty * price;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchaseQty: cart.cartItems[key].qty,
    }));
    const payload = {
      address: selectedAddress._id,
      items,
      totalAmount,
      paymentType: "cod",
      paymentStatus: "pending",
    };
    console.log(payload);
    dispatch(addOrder(payload));

    setConfirmOrder(true);
  };

  if (confirmOrder) {
    return (
      <Layout>
        <Card>
          <div>Thank you</div>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: "flex-start" }}>
        <div className='checkoutContainer'>
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className='loggedInId'>
                  <span style={{ fontWeight: 500 }} Username>
                    {auth.user.fullName}
                  </span>
                  <span style={{ margin: " 0 5px" }} Username>
                    {auth.user.email}
                  </span>
                </div>
              ) : (
                <div>
                  <MaterialInput label={"Email"} />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className='stepCompleted'>
                    {`${selectedAddress.address}-${selectedAddress.pinCode}-${selectedAddress.mobileNumber}`}
                  </div>
                ) : (
                  address.map((adr) => (
                    <Address
                      adr={adr}
                      selectAddress={selectAddress}
                      enableEditAddrressForm={enableEditAddrressForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                    />
                  ))
                )}
              </>
            }
          />
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          )}
          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMARY"}
            active={orderSumary}
            body={
              orderSumary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className='stepCompleted'>
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSumary && (
            <Card style={{ margin: "10px 0" }}>
              <div
                className='flexRow sb'
                style={{ padding: "20px", textAlign: "center" }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  onClick={userOrderConfirmation}
                  title='CONTINUE'
                  style={{ width: "200px" }}
                />
              </div>
            </Card>
          )}
          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTION"}
            active={paymentOption}
            body={
              paymentOption && (
                <div stepCompleted>
                  <div
                    className='flexRow'
                    style={{ alignItems: "center", padding: "20px" }}
                  >
                    <input type='radio' name='paymentOption' value='cod' />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title='CONFIRM ORDER'
                    onClick={onConfirmOrder}
                    style={{ width: "200px" }}
                  />
                </div>
              )
            }
          />
        </div>
        <PriceDetails
          totalItems={Object.keys(cart.cartItems).reduce((qty, key) => {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((toltalPrice, key) => {
            const { qty, price } = cart.cartItems[key];
            return toltalPrice + qty * price;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;

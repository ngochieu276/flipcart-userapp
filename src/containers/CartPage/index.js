import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import "./style.css";
import { addToCart, getCartItems } from "../../actions";
import { authConstant } from "../../actions/constant";
import { removeCartItem } from "../../actions";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";

/**
 * @author
 * @function CartPage
 **/
// before login
// add product to cart
// save in localstorage
// when try to checkout ask for credentials and if logged in then add products to user cart database from localStorage

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const [cartItems, setCartItems] = useState({});

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCartItems());
  // });

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => {
          return (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          );
        })}
      </>
    );
  }
  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100%-400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => {
            return (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            );
          })}
          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title='PLACE ORDER'
                onClick={() => props.history.push("/checkout")}
              />
            </div>
          </div>
        </Card>
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

export default CartPage;

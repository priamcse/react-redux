import React, { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../src/store/cart";
import CashOnDelivery from "./CashOnDelivery";

const Cart = () => {
  const [cod, setCod] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  //   console.log(cartItems);
  //   console.log(cartTotalAmount);
  if (cartItems.length === 0) {
    return <div>No Products added yet...</div>;
  }
  const addHandler = (id, title, price) => {
    const quantity = 1;
    dispatch(cartActions.addCart({ id, title, price, quantity }));
  };
  const removeHandler = (id) => {
    dispatch(cartActions.removeCart({ id }));
  };
  return (
    <div>
      <h3 className="h3">Cart</h3>
      {cartItems.map((cart) => (
        <div
          key={cart.id}
          className="flex items-center justify-between border py-4 px-4 mb-4 space-x-4"
        >
          <div className="font-bold basis-2/6">{cart.title}</div>
          <div className="text-right basis-3/6">
            <div className="flex items-center space-x-2">
              <button
                className="btn-primary"
                onClick={() => removeHandler(cart.id)}
              >
                -
              </button>
              <button
                className="btn-primary"
                onClick={() => addHandler(cart.id, cart.title, cart.price)}
              >
                +
              </button>
              <div className="quantity mx-2">
                {cart.quantity} x {cart.price}
              </div>
            </div>
          </div>
          <div className="basis-1/6 text-right font-bold">
            {cart.quantity * cart.price}
          </div>
        </div>
      ))}
      <div className="text-right font-bold h4">
        Total: ${cartTotalAmount.toFixed(2)}
      </div>
      <div className="text-right mt-4">
        <button
          className="btn-primary"
          onClick={() => {
            setCod(!cod);
          }}
        >
          Cash on Delivery
        </button>
      </div>
      {cod && (
        <div className="transition-all duration-300 ease-linear">
          <CashOnDelivery />
        </div>
      )}
    </div>
  );
};

export default Cart;

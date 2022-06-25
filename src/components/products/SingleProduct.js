import React, { useRef } from "react";
import { modifiedPrice } from "../../helpers/common";
// redux
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const SingleProduct = ({ product: { id, title, price, imgURL } }) => {
  const quantityRef = useRef();
  // redux
  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    e.preventDefault();
    const quantity = +quantityRef.current.value;
    dispatch(cartActions.addCart({ id, title, price, quantity }));
  };
  return (
    <div className="rounded-lg shadow-lg bg-white max-w-sm">
      <img className="rounded-t-lg" src={imgURL} alt={title} />
      <div className="p-6">
        <h5 className="h5">{title}</h5>
        <p className="text-base mb-4">{modifiedPrice(+price)}</p>
        <form onSubmit={addToCartHandler}>
          <div className="flex items-center mb-4">
            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="form-text w-auto ml-2"
              id="quantity"
              type="number"
              min="1"
              max="5"
              defaultValue="1"
              ref={quantityRef}
            />
          </div>
          <button className="btn-primary bg-red-600 hover:bg-red-500 active:bg-red-600">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;

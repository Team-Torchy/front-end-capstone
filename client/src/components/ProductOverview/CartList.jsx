import React from 'react';

var CartList = ({ cart, skus }) => {
  console.log(cart, skus);

  return cart.map((item, i) => {
    return (
      <div>{item}</div>
    );

  });
};

export default CartList;
import React from 'react';

var CartList = ({ cart, skus }) => {
  console.log(cart, skus);

  return cart.map(item => {
    return (
      <div>{item}</div>
    );

  });
};

export default CartList;
import React from 'react';

var CartList = ({ cart, skus }) => {
  console.log(cart, skus);
  return cart.map((item, i) => {
    for (var sku in skus.skus) {
      // console.log(item, Number(sku));
      if (item === Number(sku)) {
        // console.log(skus.skus[sku]);
        return (
          <div key={i}>
            <img className='style' src={skus.photos[0].thumbnail_url} />
            <p>{skus.name}</p>
            <p>{skus.original_price}</p>
          </div>
        );
      }
    }
  });
  return null;
};

export default CartList;
import React from 'react';

var CartList = ({ cart }) => {
  console.log(cart);
  var total = 0;
  return (
    <div>
      {cart.map((item, i) => {
        total = total + Number(item.original_price);
        return (
          <div key={i}>
            <img className="galleryImage" src={item.photos[0].thumbnail_url} /><h2>{item.name}</h2><p>{item.original_price}</p>
          </div>
        );
      })}
      <h1>Total Price:</h1>
      <p>${total}</p>
    </div>
  );
};


export default CartList;
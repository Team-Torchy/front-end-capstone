import React from 'react';

var CartList = ({ cart }) => {
  console.log(cart);
  var total = 0;
  return (
    <div className='cartItem'>
      {cart.map((item, i) => {
        var price = (Number(item.sale_price) !== 0 ? Number(item.sale_price) : Number(item.original_price));
        total = total + price;
        return (
          <div key={i} >
            <img className="galleryImage" src={item.photos[0].thumbnail_url} /><h2>{item.name}</h2><p>{price}</p>
          </div>
        );
      })}
      <h1>Total Price:</h1>
      <p>${total}</p>
    </div>
  );
};


export default CartList;
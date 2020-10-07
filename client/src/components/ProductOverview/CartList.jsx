import React from 'react';
import { Grid } from '@material-ui/core';

var CartList = ({ cart, remove }) => {
  console.log(cart);
  var total = 0;
  return (
    <div className='cartItem'>
      {cart.map((item, i) => {
        var price = (Number(item.sale_price) !== 0 ? Number(item.sale_price) : Number(item.original_price));
        total = total + price;
        return (
          <div key={i} >
            <Grid container>
              <Grid item xs={3}>
                <img className="cartImage" src={item.photos[0].thumbnail_url} />
              </Grid>
              <Grid item xs={9}>
                <h2>{item.name}</h2>
                <p onClick={remove}>{price} | Remove from Cart</p>
              </Grid>
            </Grid>
          </div>
        );
      })}
      <h1>Total Price:</h1>
      <p>${total}</p>
    </div>
  );
};


export default CartList;